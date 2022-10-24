import type { Component } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import { Parser } from "acorn";

import styles from "./App.module.css";

const App: Component = () => {
  const [ getInput, setInput ] = createSignal("");
  const [ getOutput, setOutput ] = createSignal("");

  const transform = (input: string) => {
    try {
      return JSON.stringify(Parser.parse(input, { ecmaVersion: 2020 }));
    } catch (e) {
      return JSON.stringify(e);
    }
  };

  createEffect(() => {
    const input = getInput();
    const output = transform(input);
    setOutput(output);
  });

  return (
    <main class={styles.main}>
      <textarea class={styles.textarea} onInput={input => setInput((input.target as HTMLInputElement).value)}
                value={getInput()}/>
      <textarea class={styles.textarea} readonly value={getOutput()}/>
    </main>
  );
};

export default App;
