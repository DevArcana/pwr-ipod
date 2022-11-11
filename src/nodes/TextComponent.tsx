import Rete, { Node } from "rete";
import { textSocket } from "../sockets";
import { WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { TextControl } from "../controls/TextControl";

export class TextComponent extends Rete.Component {
  constructor() {
    super("Text");
  }

  // @ts-ignore
  builder(node: Node) {
    const out1 = new Rete.Output("text", "Text", textSocket);
    const ctrl = new TextControl(this.editor, "text", node);

    return node.addControl(ctrl).addOutput(out1);
  }

  // @ts-ignore
  worker(node: Node, inputs: WorkerInputs, outputs: WorkerOutputs) {
    outputs["text"] = node.data.num;
  }
}