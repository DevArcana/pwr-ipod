import type { Component } from "solid-js";
import { css } from "solid-styled";

const CodeWindow: Component = () => {
  css`
    .code-window {
      width: 80%;
    }
    
    .windows {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--size-4);
    }
    
    .window {
      padding: var(--size-4);
      background-color: white;
      box-shadow: var(--shadow-3);
    }
    
    textarea {
      width: 100%;
      margin-top: var(--size-2);
    }
    
    .pipeline-settings {
      margin-top: var(--size-4);
      padding: var(--size-4);
      background-color: white;
      box-shadow: var(--shadow-3);
    }
    
    .inputs-outputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--size-4);
    }
    
    .inputs-outputs div {
      background-color: whitesmoke;
      margin-top: var(--size-2);
      padding: var(--size-2);
    }

    .inputs-outputs div h6 {
      font-weight: bolder;
    }
  `;

  return (
    <div class="code-window">
      <div class="windows">
        <div class="window">
          <h6>Input</h6>
          <textarea rows={12}>this is input</textarea>
        </div>
        <div class="window">
          <h6>Output</h6>
          <textarea rows={12}>this is input</textarea>
        </div>
      </div>

      <div class="pipeline-settings">
        <h6>Pipeline</h6>
        <div class="inputs-outputs">
          <div><h6>available</h6></div>
          <div><h6>chosen</h6></div>
        </div>
      </div>
    </div>
  );
};

export default CodeWindow;
