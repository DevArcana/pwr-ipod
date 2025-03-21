import { Node } from "acorn";
import { Transformers } from "../../../transformers/ast/ast";
import { AbstractAstComponent } from "./AbstractAstComponent";

export class HexStringMangler extends AbstractAstComponent {
  constructor() {
    super("Hex string mangler");
  }

  transformation(node: Node): Node {
    return Transformers.Ast.String.HexString.transform(node);
  }
}
