import React from "react";
import { HTML } from '../config';

interface PreviewProps {
  code: string;
}


const Perview: React.FC<PreviewProps> = ({code}) => {

  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if(iframeRef.current) {
      iframeRef.current.srcdoc = HTML;
      iframeRef.current.contentWindow?.postMessage(code, '*');
    }
  }, [code])
  return (
    <iframe 
      title="Preview"
      srcDoc={HTML}
      sandbox="allow-scripts"
      ref= {iframeRef}
    />
  )
}

export default Perview;