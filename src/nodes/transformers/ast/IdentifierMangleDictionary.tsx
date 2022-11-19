import { Node } from "acorn";
import { Transformers } from "../../../transformers/ast/ast";
import { AbstractAstComponent } from "./AbstractAstComponent";

export class IdentifierMangleDictionary extends AbstractAstComponent {
  constructor() {
    super("Variable dictionary mangler");
  }

  transformation(node: Node): Node {
    return Transformers.Ast.IdentifierMangle.Dictionary.transform(node);
  }
}
