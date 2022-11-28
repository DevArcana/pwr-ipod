import { Node } from "acorn";
import { Transformers } from "../../../transformers/ast/ast";
import { AbstractAstComponent } from "./AbstractAstComponent";

export class ReverseHexStringMangler extends AbstractAstComponent {
  constructor() {
    super("UnHex string mangler");
  }

  transformation(node: Node): Node {
    return Transformers.Ast.String.HexString.reverse(node);
  }
}
