import React from "react";
import { HTML } from '../../config';
import './Preview.css';
interface PreviewProps {
  code: string;
  codeState: string;
}


const Perview: React.FC<PreviewProps> = ({code, codeState}) => {

  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if(iframeRef.current) {
      iframeRef.current.srcdoc = HTML;
      iframeRef.current.onload = () => {
        if (iframeRef.current) {
          iframeRef.current.contentWindow?.postMessage(code, '*');
        }
      }
    }
  }, [code])
  return (
    <div className="preview-wrapper">
      <iframe
        title="Preview"
        srcDoc={HTML}
        sandbox="allow-scripts"
        ref= {iframeRef}
      />
      {codeState && <div className="preview-error">{codeState}</div>}
    </div>
  )
}

export default Perview;