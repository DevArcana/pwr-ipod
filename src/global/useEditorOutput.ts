let value = '';
const callbacks: ((v: string)=>void)[] = [];

const getEditorOutput = () => value;

const setEditorOutput = (v: string) => {
  value = v;
  callbacks.forEach(cb => cb(v));
}

const onEditorOutputChange = (cb: (v: string) => void) => {
  callbacks.push(cb);
}

export function useEditorOutput() {
  return {getEditorOutput, setEditorOutput, onEditorOutputChange}
}