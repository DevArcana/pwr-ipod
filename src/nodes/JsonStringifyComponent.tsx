import { Node } from "astring";
import Rete from "rete";
import { WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { anythingSocket, textSocket } from "../sockets";

export class JsonStringifyComponent extends Rete.Component {
  constructor() {
    super("JSON Stringify");
  }

  // @ts-ignore
  builder(node: Rete.Node) {
    const in1 = new Rete.Input("anything", "Anything", anythingSocket);
    const out1 = new Rete.Output("text", "Text", textSocket);

    return node.addInput(in1).addOutput(out1);
  }

  // @ts-ignore
  worker(node: Node, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const input = inputs.anything[0];

    if (input) {
      outputs["text"] = JSON.stringify(input, null, 2);
    }
  }
}
