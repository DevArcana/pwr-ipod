import { Node } from "acorn";
import { Transformers } from "../../../transformers/ast/ast";
import { AbstractAstComponent } from "./AbstractAstComponent";

export class GlobalStrings extends AbstractAstComponent {
  constructor() {
    super("Global strings");
  }

  transformation(node: Node): Node {
    return Transformers.Ast.String.Global.transform(node);
  }
}
