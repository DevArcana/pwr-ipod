import { Node } from "acorn";
import { Transformers } from "../../../transformers/ast/ast";
import { AbstractAstComponent } from "./AbstractAstComponent";

export class PropertyToDict extends AbstractAstComponent {
  constructor() {
    super("Property to dict");
  }

  transformation(node: Node): Node {
    return Transformers.Ast.Property.transform(node);
  }
}
