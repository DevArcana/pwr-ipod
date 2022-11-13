import { Node } from "astring";
import Rete from "rete";
import { WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { textSocket } from "../../../sockets";

// @ts-ignore
export abstract class AbstractTextComponent extends Rete.Component {
  // @ts-ignore
  builder(node: Rete.Node) {
    const in1 = new Rete.Input("text", "Text", textSocket);
    const out1 = new Rete.Output("text", "Text", textSocket);

    return node.addInput(in1).addOutput(out1);
  }

  // @ts-ignore
  worker(node: Node, inputs: WorkerInputs, outputs: WorkerOutputs) {
    console.log(inputs);
    // @ts-ignore
    const input = inputs.text[0];

    if (input) {
      outputs["text"] = this.transformation(input as string);
    }
  }

  abstract transformation(input: string): string;
}
