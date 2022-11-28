import acorn from "acorn";
import { Node } from "astring";
import Rete from "rete";
import { WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { astSocket } from "../../../sockets";

// @ts-ignore
export abstract class AbstractAstComponent extends Rete.Component {
  // @ts-ignore
  builder(node: Rete.Node) {
    const in1 = new Rete.Input("ast", "AST", astSocket);
    const out1 = new Rete.Output("ast", "AST", astSocket);

    return node.addInput(in1).addOutput(out1);
  }

  // @ts-ignore
  worker(node: Node, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const input = inputs.ast[0];

    if (input) {
      outputs["ast"] = this.transformation(JSON.parse(JSON.stringify(input)) as acorn.Node);
    }
  }

  abstract transformation(node: acorn.Node): acorn.Node;
}
