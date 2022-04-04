import React from "react";
import { Cell } from "../../state/types";
import { DEBOUNCE } from "../../config";
import { Resizable, Spinner } from '../../shared';
import { CodeEditor, Perview } from '../';
import { useStartEsbuildService, useActions, useTypedSelector, useCumulativeCode } from "../../hooks";
import './CodeCell.css'
// npm view react dist.tarball
interface CodeCellProps {
  cell: Cell
}
const CodeCell:React.FC<CodeCellProps> = ({cell}) => {
  /**
   * State
   */
  const bundel = useStartEsbuildService();
  const { updateCell } = useActions();
  const bundelStateCellById = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  React.useEffect(() => {
    if (!bundelStateCellById) {
      bundel(cumulativeCode, cell.id);
      return;
    }
    const timerId = setTimeout( () => bundel(cumulativeCode, cell.id), DEBOUNCE);
    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id]);

  return (
    <Resizable direction='vertical'>
      <div className="code-cell-wrapper">
        <Resizable direction='horizontal'>
          <CodeEditor initialValue={cell.content} onChange={(value: string) => updateCell(cell.id, value) }/>
        </Resizable>
        <div className="code-cell-preview-wrapper">
        { 
          !bundelStateCellById || bundelStateCellById.loading
          ? <Spinner />
          : <Perview code={bundelStateCellById.code} codeState={bundelStateCellById.err}/>
        }
        </div>
      </div>
    </Resizable>
  )
};
export default CodeCell;