import { Node } from "acorn";
import { Transformers } from "../../../transformers/ast/ast";
import { AbstractAstComponent } from "./AbstractAstComponent";

export class ReversePropertyToDict extends AbstractAstComponent {
  constructor() {
    super("UnProperty to dict");
  }

  transformation(node: Node): Node {
    return Transformers.Ast.Property.reverse(node);
  }
}
