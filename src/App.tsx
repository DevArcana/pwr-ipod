import type { Component } from 'solid-js';
import {Parser} from 'acorn';

import styles from './App.module.css'
import { createEffect, createSignal } from "solid-js";

const App: Component = () => {
  const [getInput, setInput] = createSignal("");
  const [getOutput, setOutput] = createSignal("");

  const transform = (input: string) => {
    return JSON.stringify(Parser.parse(input, {ecmaVersion: 2020}))
  }

  createEffect(() => {
    const input = getInput();
    const output = transform(input);
    setOutput(output);
  })

  return (
    <main class={styles.main}>
      <textarea class={styles.textarea} onInput={input => setInput((input.target as HTMLInputElement).value)} value={getInput()}/>
      <textarea class={styles.textarea} readonly value={getOutput()} />
    </main>
  );
};

export default App;
