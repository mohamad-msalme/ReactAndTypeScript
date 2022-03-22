import { ServiceOptions } from "esbuild-wasm";

export const serviceOptions: ServiceOptions = {
  worker: true,
  wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
};
