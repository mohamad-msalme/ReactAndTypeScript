import React from 'react';
import * as esbuild from 'esbuild-wasm'
import { fetchPlugin, unpkgPathPlugin } from './plugin';

const serviceOptions: esbuild.ServiceOptions = {
  worker: true,
  wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
};

const buildOptions: esbuild.BuildOptions = {
  entryPoints: ['index.js'],
  bundle: true,
  write: false,
  define: {
    'process.env.NODE_ENV': '"production"',
    global: 'window',
  }
}

const useStartEsbuildService = () => {
  // State
  const service = React.useRef<esbuild.Service>();
  // Side effect functions
  React.useEffect(() => {
    startService();
  }, [])

  /**
   * Helper functions
   */
  const startService = async (): Promise<esbuild.Service> => service.current = await esbuild.startService(serviceOptions);
  /**
   * 
   * @param code : string
   * @returns 
   */
  const build = async (code: string) => {
    const result = await service.current?.build({...buildOptions, plugins: [unpkgPathPlugin(), fetchPlugin(code)]});
    if (result?.outputFiles) {
      return result.outputFiles[0].text;
    }
    return null;
  }

  return React.useMemo(() => build, [])
}
export default useStartEsbuildService;