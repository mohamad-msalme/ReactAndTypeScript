import React from 'react';
import * as esbuild from 'esbuild-wasm'
import { useActions } from '../index';
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
  },
  jsxFactory: '_React.createElement',
  jsxFragment: '_React.Fragment',
}

const useStartEsbuildService = () => {
  // State
  const service = React.useRef<esbuild.Service>();
  const { bundleCompleteAction, bundleStartAction } = useActions();

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
  const build = async (code: string, cellId: string) => {
    try {
      bundleStartAction(cellId);
      const result = await service.current?.build({...buildOptions, plugins: [unpkgPathPlugin(), fetchPlugin(code)]});
      bundleCompleteAction(cellId, {
        loading: false,
        code: result &&  result.outputFiles ? result.outputFiles[0].text : '',
        err: ''
      })
    } catch (_error) {
      const error = _error as { message: string};
      bundleCompleteAction(cellId, {
        loading: false,
        code: '',
        err: error.message
      })
    }
  }

  return React.useMemo(() => build, [])
}
export default useStartEsbuildService;

