import { generate, Node } from "astring";
import Rete from "rete";
import { WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { astSocket, textSocket } from "../sockets";

export class CodeGenerator extends Rete.Component {
  constructor() {
    super("Code generator");
  }

  // @ts-ignore
  builder(node: Rete.Node) {
    const in1 = new Rete.Input("ast", "AST", astSocket);
    const out1 = new Rete.Output("text", "Text", textSocket);

    return node.addInput(in1).addOutput(out1);
  }

  // @ts-ignore
  worker(node: Node, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const input = inputs.ast[0];

    if (input) {
      outputs["text"] = generate(input as Node);
    }
  }
}
