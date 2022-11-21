import { Node } from "astring";
import Rete from "rete";
import { WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { astSocket, textSocket } from "../sockets";

export class TextToAstComponent extends Rete.Component {
  constructor() {
    super("Text to AST");
  }

  // @ts-ignore
  builder(node: Rete.Node) {
    const in1 = new Rete.Input("text", "Text", textSocket);
    const out1 = new Rete.Output("ast", "AST", astSocket);

    return node.addInput(in1).addOutput(out1);
  }

  // @ts-ignore
  worker(node: Node, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const input = inputs.text[0] as string;

    if (input) {
      outputs["ast"] = JSON.parse(input);
    }
  }
}
