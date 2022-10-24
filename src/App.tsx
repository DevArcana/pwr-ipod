import type { Component } from 'solid-js';

import styles from './App.module.css'

const App: Component = () => {
  return (
    <main class={styles.main}>
      <textarea class={styles.textarea}>area 1</textarea>
      <textarea class={styles.textarea}>area 2</textarea>
    </main>
  );
};

export default App;
