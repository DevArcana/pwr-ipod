import CodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";
// @ts-ignore
import { javascript } from "@codemirror/lang-javascript";
import "./App.css";
import { useEditorInput } from "./global/useEditorInput";
import { useEditorOutput } from "./global/useEditorOutput";
import { useRete } from "./rete";

function App() {
  const [ setContainer ] = useRete();

  const { setEditorInput, onEditorInputChange } = useEditorInput();
  const { onEditorOutputChange } = useEditorOutput();

  const [ input, setInput ] = useState("");
  const [ output, setOutput ] = useState("");

  useEffect(() => {
    onEditorInputChange((editorInput) => {
      setInput(editorInput);
    });

    onEditorOutputChange((editorOutput) => {
      setOutput(editorOutput);
    });

    setEditorInput(initial_code);
  }, []);

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
        extensions={[ javascript({ jsx: false }) ]}
        onChange={onChange}
      />
      <CodeMirror
        className="textarea"
        editable={false}
        value={output}
        height="100%"
        width="100%"
        extensions={[ javascript({ jsx: false }) ]}
        basicSetup={{
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
        }}
      />
      <div
        className="editor"
        style={{
          width: "100vw",
          height: "100vh",
        }}
        ref={(ref) => ref && setContainer(ref as any)}
      />
    </main>
  );
}

const initial_code = `
  /*
https://github.com/trekhleb/javascript-algorithms
*/

// Create alphabet array: ['a', 'b', 'c', ..., 'z'].
const englishAlphabet = "abcdefghijklmnopqrstuvwxyz".split("");

/**
 * Generates a cipher map out of the alphabet.
 * Example with a shift 3: {'a': 'd', 'b': 'e', 'c': 'f', ...}
 *
 * @param {string[]} alphabet - i.e. ['a', 'b', 'c', ... , 'z']
 * @param {number} shift - i.e. 3
 * @return {Object} - i.e. {'a': 'd', 'b': 'e', 'c': 'f', ..., 'z': 'c'}
 */
const getCipherMap = (alphabet, shift) => {
  return alphabet.reduce((charsMap, currentChar, charIndex) => {
    const charsMapClone = { ...charsMap };
    // Making the shift to be cyclic (i.e. with a shift of 1 - 'z' would be mapped to 'a').
    let encryptedCharIndex = (charIndex + shift) % alphabet.length;
    // Support negative shifts for creating a map for decryption
    // (i.e. with shift -1 - 'a' would be mapped to 'z').
    if (encryptedCharIndex < 0) {
      encryptedCharIndex += alphabet.length;
    }
    charsMapClone[currentChar] = alphabet[encryptedCharIndex];
    return charsMapClone;
  }, {});
};

/**
 * @param {string} str
 * @param {number} shift
 * @param {string[]} alphabet
 * @return {string}
 */
const caesarCipherEncrypt = (str, shift, alphabet = englishAlphabet) => {
  // Create a cipher map:
  const cipherMap = getCipherMap(alphabet, shift);
  return str
    .toLowerCase()
    .split("")
    .map((char) => cipherMap[char] || char)
    .join("");
};

/**
 * @param {string} str
 * @param {number} shift
 * @param {string[]} alphabet
 * @return {string}
 */
const caesarCipherDecrypt = (str, shift, alphabet = englishAlphabet) => {
  // Create a cipher map:
  const cipherMap = getCipherMap(alphabet, -shift);
  return str
    .toLowerCase()
    .split("")
    .map((char) => cipherMap[char] || char)
    .join("");
};

const sampleText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

const SHIFT = 5;

caesarCipherDecrypt(
  caesarCipherEncrypt(sampleText, SHIFT),
  SHIFT
).toLowerCase() === sampleText.toLowerCase();

  `;

export default App;
