import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import './textEditor.css';
interface Modes {
  editMode: () => JSX.Element;
  readMode: () => JSX.Element;
}

const TextEditor: React.FC = () => {

  const [input, setInput] = React.useState<string>();
  const [mode, setMode] = React.useState<'editMode' | 'readMode'>('readMode');
  const ref = React.useRef<HTMLDivElement | null>(null);
  const modes: Modes = {
    editMode: () => {
      return (
        <div className='text-editor' ref={ref}>
          <MDEditor value={input} onChange={setInput} />
        </div>
      )
    },
    readMode: () => {
      return (
        <div className='text-editor card' onClick={() => setMode('editMode')}>
          <div className='card-content'>
            <MDEditor.Markdown source={input || '# Header'} />
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