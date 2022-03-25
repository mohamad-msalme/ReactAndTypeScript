import React from "react";
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { editor } from "monaco-editor";
import './CodeEditor.css';

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const monacoEditorRef = React.useRef<editor.IStandaloneCodeEditor>();
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    monacoEditorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    monacoEditor.getModel()?.updateOptions({tabSize: 2});
  }
  const onFormatClick = () => {
    if(monacoEditorRef.current) {
      const unFormatedCode = monacoEditorRef.current.getModel()?.getValue() as string;
      const formatedCode = prettier.format(unFormatedCode, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      }).replace(/\n$/, '');
      monacoEditorRef.current.setValue(formatedCode);
    }
  }
  return (
    <div className="editor-wraper">
      <button 
        className="button button-format is-primary is-small" 
        onClick={onFormatClick}
      >Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        language="javascript"
        value={initialValue}
        theme="dark"
        options={{
          wordWrap: 'on',
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          minimap: {
            enabled: false
          },
          dimension: {
            height: 500,
            width: 100
          }
        }}
     />
    </div>
  )
}

export default CodeEditor;