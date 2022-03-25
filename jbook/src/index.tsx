import ReactDOM  from "react-dom";
import * as esbuild from 'esbuild-wasm';
import React, { useState, useEffect, useRef } from "react";
import CodeEditor from "./components/CodeEditor";
import { serviceOptions } from "./config";
import { fetchPlugin, unpkgPathPlugin } from "./plugin";
// npm view react dist.tarball
const App = () => {
  const [ input, setInput ] = useState<string>('');
  const service = useRef<esbuild.Service>();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const startService = async () => service.current = await esbuild.startService(serviceOptions);
  const html = `
    <html>
      <head></head>
      <body>
        <div id='root'></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (error) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' +error + '</div>'
              console.error(error);
            }
          }, false);
        </script>
      </body>
    </html>
  `
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
      if(iframeRef && iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.srcdoc = html;
        iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
      }
    }
  }
  return (
    <div>
      <CodeEditor 
        initialValue={input}
        onChange={(value: string) => setInput(value)}
      />
      <textarea
        value={input}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value) }
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title="Preview"
        srcDoc={html}
        sandbox="allow-scripts"
        ref= {iframeRef}
      />
    </div>
  )
};

ReactDOM.render(<App />, document.querySelector('#root'));