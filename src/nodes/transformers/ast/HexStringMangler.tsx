import { Node } from "astring";
import Rete from "rete";
import { WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { astSocket } from "../../../sockets";
import { astTransformHexString } from "../../../transformers/ast/hexString";

export class HexStringMangler extends Rete.Component {
  constructor() {
    super("Hex string mangler");
  }

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
      outputs["ast"] = astTransformHexString(input as acorn.Node);
    }
  }
}
