import React from "react";
import Perview from "./Preview";
import CodeEditor from "./CodeEditor";
import {useStartEsbuildService} from "../hooks/index";

// npm view react dist.tarball
const CodeCell:React.FC = () => {
  /**
   * State
   */
  const [ code, setCode ] = React.useState<string>('');
  const [ input, setInput ] = React.useState<string>('const a = 1;');
  const bundel = useStartEsbuildService();
  
  const onSubmitClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    if (input) {
      const result = await bundel(input);
      result && setCode(result);
    }
  }
  return (
    <div>
      <CodeEditor 
        initialValue={input}
        onChange={(value: string) => setInput(value)}
      />
      <div>
        <button onClick={onSubmitClick}>Submit</button>
      </div>
      <Perview code={code} />
    </div>
  )
};
export default CodeCell;