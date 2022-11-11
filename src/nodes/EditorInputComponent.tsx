import Rete, { Node } from "rete";
import { textSocket } from "../sockets";
import { WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { useEditorInput } from "../global/useEditorInput";

export class EditorInputComponent extends Rete.Component {
  private input: string = '';
  private instances: Node[] = [];

  constructor() {
    super("Editor Input");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {onEditorInputChange, getEditorInput} = useEditorInput();
    this.input = getEditorInput();
    onEditorInputChange((input) => {
      this.instances.forEach(instance => {
        if (instance) {
          instance.data.text = input;
          instance.update();
        }
      })
      this.editor?.trigger("process");
    })
  }

  // @ts-ignore
  builder(node: Node) {
    const out1 = new Rete.Output("text", "Text", textSocket);
    this.instances.push(node);
    return node.addOutput(out1);
  }

  // @ts-ignore
  worker(node: Node, inputs: WorkerInputs, outputs: WorkerOutputs) {
    outputs["text"] = node.data.text;
  }
}