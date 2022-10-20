import type { Component } from "solid-js";
import { css } from "solid-styled";

const App: Component = () => {
  css`
    main {
      background-color: red;
    }
  `;

  return (
    <main>
      using solid-styled
    </main>
  );
};

export default App;
