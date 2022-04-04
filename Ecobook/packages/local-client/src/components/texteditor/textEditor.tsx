import './textEditor.css';
import React from 'react';
import { Cell } from '../../state/types';
import MDEditor from '@uiw/react-md-editor';
import { useActions } from '../../hooks';
interface Modes {
  editMode: () => JSX.Element;
  readMode: () => JSX.Element;
}
interface TextEditorProps {
  cell: Cell
}
const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {

  const [mode, setMode] = React.useState<'editMode' | 'readMode'>('readMode');
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();
  const modes: Modes = {
    editMode: () => {
      return (
        <div className='text-editor' ref={ref}>
          <MDEditor value={cell.content} onChange={(value) => updateCell(cell.id, value || '')} />
        </div>
      )
    },
    readMode: () => {
      return (
        <div className='text-editor card' onClick={() => setMode('editMode')}>
          <div className='card-content'>
            <MDEditor.Markdown source={`${cell.content || 'Click to edit'}`} />
          </div>
        </div>
      )
    } 
  }

  React.useEffect(() => {
    const listener = (event: MouseEvent) => !(ref.current && event.target && ref.current.contains(event.target as Node)) && setMode('readMode');
    document.addEventListener('click', listener, { capture: true});
    return () => document.removeEventListener('click', listener);
  }, [])

  return modes[mode]();
}
export default TextEditor;