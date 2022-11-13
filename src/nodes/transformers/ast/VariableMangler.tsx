import { Node } from "acorn";
import { astTransformVariableMangle } from "../../../transformers/ast/variableMangle";
import { AbstractAstComponent } from "./AbstractAstComponent";

export class VariableMangler extends AbstractAstComponent {
  constructor() {
    super("Variable mangler");
  }

  transformation(node: Node): Node {
    return astTransformVariableMangle(node);
  }
}
