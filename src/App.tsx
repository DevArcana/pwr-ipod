import React, { useEffect, useState } from "react";
import CodeMirror from '@uiw/react-codemirror';
// @ts-ignore
import { javascript } from "@codemirror/lang-javascript";
import "./App.css";
import { Parser } from "acorn";
import { generate } from "astring";
import { useRete } from "./rete";

function App() {
  const options = { ecmaVersion: 2020 };
  const [ input, setInput ] = useState("");
  const [ ast, setAst ] = useState(Parser.parse("", { ecmaVersion: 2020 }));
  const [ output, setOutput ] = useState("");
  const [ exception, setException ] = useState<string>();
  const [ displayAst, setDisplayAst ] = useState(false);
  const [ resolved, setResolved ] = useState("");

  const [setContainer] = useRete();

  useEffect(() => {
    const transformed = input;

    try {
      const ast = Parser.parse(transformed, { ecmaVersion: 2020 });
      setAst(ast);
      setException(undefined);
    } catch (e) {
      setException(JSON.stringify(e));
    }
  }, [input]);

  useEffect(() => {
    const transformedAst = ast;
    const transformedOutput = generate(transformedAst);
    setOutput(transformedOutput);
  }, [ast]);

  useEffect(() => {
    if (exception) {
      setResolved(exception)
    }
    else {
      setResolved(displayAst ? JSON.stringify(ast) : output)
    }
  }, [output, exception, displayAst])

  const onChange = React.useCallback((value: string, viewUpdate: any) => {
    setInput(value);
  }, []);

  const onDisplayAstChange = () => {
    setDisplayAst(!displayAst);
  }

  return (
    <main className="main">
      <nav className="nav">
        <input type="checkbox" name="displayAst" checked={displayAst} onClick={onDisplayAstChange}/>
        <label htmlFor="displayAst">display AST</label>
      </nav>
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
        value={resolved}
        height="100%"
        width="100%"
        extensions={[javascript({ jsx: false })]}
        basicSetup={{highlightActiveLine: false, highlightActiveLineGutter: false}}
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
