import CodeMirror from '@uiw/react-codemirror';
import React, { useEffect, useState } from "react";
// @ts-ignore
import { javascript } from "@codemirror/lang-javascript";
import { Parser } from "acorn";
import { generate } from "astring";
import "./App.css";
import { useRete } from "./rete";
import { astTransformVariableMangle } from "./transformers/ast/variableMangle";
import { useEditorInput } from "./global/useEditorInput";
import { useEditorOutput } from "./global/useEditorOutput";

function App() {
  const [setContainer] = useRete();

  const {setEditorInput, onEditorInputChange} = useEditorInput();
  const {onEditorOutputChange} = useEditorOutput();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    onEditorInputChange((editorInput) => {
      setInput(editorInput);
    })

    onEditorOutputChange((editorOutput) => {
      setOutput(editorOutput);
    })
  }, [])

  const onChange = React.useCallback((value: string) => {
    setEditorInput(value);
  }, []);

  return (
    <main className="main">
      <CodeMirror
        className="textarea"
        value={input}
        height="100%"
        width="100%"
        extensions={[javascript({ jsx: false })]}
        onChange={onChange}
      />
      <CodeMirror
        className="textarea"
        editable={false}
        value={output}
        height="100%"
        width="100%"
        extensions={[javascript({ jsx: false })]}
        basicSetup={{
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
        }}
      />
      <div
        className="editor"
        style={{
          width: "100vw",
          height: "100vh"
        }}
        ref={(ref) => ref && setContainer(ref as any)}
      />
    </main>
  );
}

export default App;
