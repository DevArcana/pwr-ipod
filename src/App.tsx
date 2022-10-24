import type { Component } from "solid-js";
import { batch, createEffect, createSignal } from "solid-js";
import { Parser } from "acorn";

import styles from "./App.module.css";
import { generate } from "astring";
import { inputTransformIdentity } from "./transformers/input/identity";
import { astTransformIdentity } from "./transformers/ast/identity";
import { outputTransformIdentity } from "./transformers/output/identity";

const initialProgram = `
const a = 1
let b = 2
const c = a + b * 2
console.log(c)
`.trim()

const App: Component = () => {
  const options = { ecmaVersion: 2020 };

  const [ getInput, setInput ] = createSignal(initialProgram);
  const [ getAst, setAst ] = createSignal(Parser.parse(getInput(), { ecmaVersion: 2020 }));
  const [ getOutput, setOutput ] = createSignal("");
  const [ getException, setException ] = createSignal<string>();

  const [ getDisplayAst, setDisplayAst ] = createSignal(false);

  createEffect(() => {
    const input = inputTransformIdentity(getInput());

    try {
      const ast = Parser.parse(getInput(), { ecmaVersion: 2020 });
      batch(() => {
        setAst(ast);
        setException(undefined);
      });
    } catch (e) {
      setException(JSON.stringify(e));
    }
  });

  createEffect(() => {
    const ast = astTransformIdentity(getAst());
    const output = outputTransformIdentity(generate(ast));
    setOutput(output);
  });

  const resolveOutput = () => {
    const exception = getException();
    if (exception)
      return exception;

    const output = getDisplayAst() ? JSON.stringify(getAst()) : getOutput();
    return output;
  };

  const onInput = (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    setInput(target.value);
  };

  const onAstDisplayInput = (event: MouseEvent) => {
    const target = event.target as HTMLInputElement;
    setDisplayAst(!getDisplayAst());
  };

  return (
    <main class={styles.main}>
      <nav class={styles.nav}>
        <input type="checkbox" name="displayAst" checked={getDisplayAst()} onClick={onAstDisplayInput}/>
        <label for="displayAst">display AST</label>
      </nav>
      <textarea class={styles.textarea} onInput={onInput} value={getInput()}/>
      <textarea class={styles.textarea} readOnly value={resolveOutput()}/>
    </main>
  );
};

export default App;
