import Rete, { Node } from "rete";
import { textSocket } from "../sockets";
import { WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { useEditorOutput } from "../global/useEditorOutput";

export class EditorOutputComponent extends Rete.Component {
  private onChange: (v: string) => void;

  constructor() {
    super("Editor Output");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {setEditorOutput} = useEditorOutput();
    this.onChange = setEditorOutput;
  }

  // @ts-ignore
  builder(node: Node) {
    const in1 = new Rete.Input("text", "Text", textSocket);
    return node.addInput(in1);
  }

  // @ts-ignore
  worker(node: Node, inputs: WorkerInputs, outputs: WorkerOutputs) {
    this.onChange(inputs.text[0] as string)
  }
}