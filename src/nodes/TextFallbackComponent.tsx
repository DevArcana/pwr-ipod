import Rete from "rete";
import { textSocket } from "../sockets";
import { WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { Node } from "astring";
import { TextControl } from "../controls/TextControl";

export class TextFallbackComponent extends Rete.Component {
  constructor() {
    super("Text Fallback");
  }

  // @ts-ignore
  builder(node: Rete.Node) {
    const in1 = new Rete.Input("text1", "Text 1", textSocket);
    const in2 = new Rete.Input("text2", "Text 2", textSocket);
    const out1 = new Rete.Output("text", "Text", textSocket);

    in1.addControl(new TextControl(this.editor, "text1", node));
    in2.addControl(new TextControl(this.editor, "text2", node));

    return node.addInput(in1).addInput(in2).addOutput(out1);
  }

  // @ts-ignore
  worker(node: Node, inputs: WorkerInputs, outputs: WorkerOutputs) {
    // @ts-ignore
    const input1 = inputs.text1.length ? inputs.text1[0] : node.data.text1;

    // @ts-ignore
    const input2 = inputs.text2.length ? inputs.text2[0] : node.data.text2;

    if (input1) {
      outputs["text"] = input1;
    } else if (input2) {
      outputs["text"] = input2;
    }
  }
}