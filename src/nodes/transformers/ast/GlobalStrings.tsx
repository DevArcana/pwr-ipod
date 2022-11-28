import acorn, { Node } from "acorn";
import Rete from "rete";
import { NumControl } from "../../../controls/NumControl";
import { astSocket, numSocket } from "../../../sockets";
import { Transformers } from "../../../transformers/ast/ast";

// @ts-ignore
export class GlobalStrings extends Rete.Component {
  constructor() {
    super("Global strings");
  }

  // @ts-ignore
  builder(node: Rete.Node) {
    const in1 = new Rete.Input("ast", "AST", astSocket);
    const folds = new Rete.Input("folds", "folds", numSocket);
    const out1 = new Rete.Output("ast", "AST", astSocket);

    folds.addControl(new NumControl(this.editor, "folds", node));

    return node.addInput(in1).addInput(folds).addOutput(out1);
  }

  // @ts-ignore
  worker(node: Node, inputs: WorkerInputs, outputs: WorkerOutputs) {
    let input = inputs.ast[0];
    // @ts-ignore
    const folds = inputs.folds.length ? inputs.folds[0] : node.data.folds;

    if (input) {
      for (var i = 0; i < folds; ++i) {
        input = this.transformation(input as acorn.Node);
      }

      outputs["ast"] = input;
    }
  }

  transformation(node: Node): Node {
    return Transformers.Ast.String.Global.transform(node);
  }
}
