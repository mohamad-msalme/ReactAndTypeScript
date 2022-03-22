import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';
const fileCache = localforage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      /**
       * 
       */
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });
      /**
       * 
       */
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cacheResult) return cacheResult;
        });
      /**
       * 
       */
      build.onLoad({ filter: /.css$/ }, async (args: esbuild.OnLoadArgs) => {
        const { data, request } = await axios.get(args.path);
        const escaped = data
        .replace(/\n/g, '')
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'");
        const contents =`
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;
        const result = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname
        } as esbuild.OnLoadResult
        await fileCache.setItem(args.path, result);
        return result;
      });
      /**
       * 
       */
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        const { data, request } = await axios.get(args.path);        
        const result = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        } as esbuild.OnLoadResult
        await fileCache.setItem(args.path, result);
        return result;
      });
    }

  }  
}