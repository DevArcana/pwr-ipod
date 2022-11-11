import Rete, { Node } from "rete";
import { numSocket } from "../sockets";
import { NumControl } from "../controls/NumControl";
import { WorkerInputs, WorkerOutputs } from "rete/types/core/data";

export class NumComponent extends Rete.Component {
  constructor() {
    super("Number");
  }

  // @ts-ignore
  builder(node: Node) {
    const out1 = new Rete.Output("num", "Number", numSocket);
    const ctrl = new NumControl(this.editor, "num", node);

    return node.addControl(ctrl).addOutput(out1);
  }

  // @ts-ignore
  worker(node: Node, inputs: WorkerInputs, outputs: WorkerOutputs) {
    outputs["num"] = node.data.num;
  }
}