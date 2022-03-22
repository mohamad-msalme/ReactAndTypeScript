import React, { useState, useEffect, useRef } from "react";
import ReactDOM  from "react-dom";
import * as esbuild from 'esbuild-wasm';
import { serviceOptions } from "./config";
import { fetchPlugin, unpkgPathPlugin } from "./plugin";
// npm view react dist.tarball
const App = () => {
  const [ input, setInput ] = useState<string>('');
  const [ code, setCode ]= useState<string>('');
  const service = useRef<esbuild.Service>();
  const startService = async () => service.current = await esbuild.startService(serviceOptions);

  useEffect(() => {
    startService();
  }, [])

  
  const onClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (input && service.current) {
      const result = await service.current.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(input)],
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window',
        }
      });
      setCode(result.outputFiles[0].text);
    }
  }
  return (
    <div>
      <textarea
        value={input}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value) }
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  )
};

ReactDOM.render(<App />, document.querySelector('#root'));