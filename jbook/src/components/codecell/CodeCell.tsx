import React from "react";
import { DEBOUNCE } from "../../config";
import {useStartEsbuildService} from "../../hooks/index";
import { Resizable, CodeEditor, Perview } from '../';
import './CodeCell.css'
// npm view react dist.tarball
const CodeCell:React.FC = () => {
  /**
   * State
   */
  const [ code, setCode ] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [ input, setInput ] = React.useState<string>('const a = 1;');
  const bundel = useStartEsbuildService();
  
  React.useEffect(() => {
    // Debounce 
    const timerId = setTimeout( async () => {
      if (input) {
        const result = await bundel(input);
        if (result) {
          setCode(result.code);
          setError(result.err);
        }
      }
    }, DEBOUNCE);
    return () => clearTimeout(timerId);
  }, [bundel, input]);

  return (
    <Resizable direction='vertical'>
      <div className="code-cell-wrapper">
        <Resizable direction='horizontal'>
          <CodeEditor initialValue={input} onChange={(value: string) => setInput(value)}/>
        </Resizable>
        <Perview code={code} codeState={error} />
      </div>
    </Resizable>
  )
};
export default CodeCell;