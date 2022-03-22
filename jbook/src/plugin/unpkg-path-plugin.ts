import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      /**
       * handel root entry file of 'index.js'
       */
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return {
          path: 'index.js',
          namespace: 'a',
        };
      });
      /**
       * handel relative paths in a module
       */
      build.onResolve({ filter: /^\.+\//}, (args: esbuild.OnResolveArgs) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
        }
      })
      /**
       * handel main file of a module 
       */
      build.onResolve({ filter: /.*/ }, (args: esbuild.OnResolveArgs) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        }
      });
    },
  };
};