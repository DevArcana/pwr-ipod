let value = "";
const callbacks: ((v: string) => void)[] = [];

const getEditorInput = () => value;

const setEditorInput = (v: string) => {
  value = v;
  callbacks.forEach(cb => cb(v));
};

const onEditorInputChange = (cb: (v: string) => void) => {
  callbacks.push(cb);
  setEditorInput(value);
};

export function useEditorInput() {
  return { getEditorInput, setEditorInput, onEditorInputChange };
}