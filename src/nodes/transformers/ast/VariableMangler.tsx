import { Node } from "acorn";
import { astTransformVariableMangle } from "../../../transformers/ast/variableMangle";
import { AbstractAstMangler } from "./AbstractAstMangler";

export class VariableMangler extends AbstractAstMangler {
  constructor() {
    super("Variable mangler");
  }

  transformation(node: Node): Node {
    return astTransformVariableMangle(node);
  }
}
