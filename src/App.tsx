import type { Component } from "solid-js";
import { css } from "solid-styled";
import CodeWindow from "./CodeWindow";

const App: Component = () => {
  css`
    nav {
      padding: var(--size-5);
    }

    main {
      display: flex;
      justify-content: center;
    }
    
    footer {
      padding: var(--size-5);
      margin-top: auto;
      display: flex;
      justify-content: center;
    }

    footer p {
      font-size: var(--font-size-0);
    }
  `;

  return (
    <>
      <nav>JavaScript Obfuscator</nav>
      <main>
        <CodeWindow/>
      </main>
      <footer>
        <p>© 2022 Piotr Krzystanek and Bartłomiej Chmiel</p>
      </footer>
    </>
  );
};

export default App;
