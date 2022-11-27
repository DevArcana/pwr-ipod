import Rete, { Node } from "rete";
import { astSocket, exceptionSocket, textSocket } from "../sockets";
import { WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { Parser } from "acorn";
import { Simulate } from "react-dom/test-utils";

export class ParserComponent extends Rete.Component {
  constructor() {
    super("Parser");
  }

  // @ts-ignore
  builder(node: Node) {
    const in1 = new Rete.Input("text", "Text", textSocket);
    const out1 = new Rete.Output("ast", "AST", astSocket);
    const out2 = new Rete.Output("exception", "Exception", exceptionSocket);

    return node.addInput(in1).addOutput(out1).addOutput(out2);
  }

  // @ts-ignore
  worker(node: Node, inputs: WorkerInputs, outputs: WorkerOutputs) {
    const input = inputs.text[0] as string;
    try {
      outputs["ast"] = Parser.parse(input, { ecmaVersion: 2020 });
      outputs["exception"] = null;
    } catch (e) {
      outputs["ast"] = null;
      outputs["exception"] = e;
    }
  }
}