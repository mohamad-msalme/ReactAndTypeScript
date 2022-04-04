import React from "react";
import { Cell } from "../../state/types";
import { DEBOUNCE } from "../../config";
import { Resizable, Spinner } from '../../shared';
import { CodeEditor, Perview } from '../';
import { useStartEsbuildService, useActions, useTypedSelector } from "../../hooks";
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
  const { updateCell, bundleCompleteAction, bundleStartAction } = useActions();
  const bundelStateCellById = useTypedSelector((state) => state.bundles[cell.id]);
  const createBundel = React.useCallback( async () => {
      bundleStartAction(cell.id);
      const result = await bundel(cell.content);
        bundleCompleteAction(cell.id, {
          loading: false,
          code: result?.code || '',
          err: result?.err || ''
        })
  }, [cell.id, cell.content, bundel, bundleStartAction, bundleCompleteAction]);
  
  React.useEffect(() => {
    if (!bundelStateCellById) {
      createBundel();
      return;
    }
    const timerId = setTimeout( createBundel, DEBOUNCE);
    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createBundel]);

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