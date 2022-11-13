import { Node } from "acorn";
import { astTransformHexString } from "../../../transformers/ast/hexString";
import { AbstractAstComponent } from "./AbstractAstComponent";

export class HexStringMangler extends AbstractAstComponent {
  constructor() {
    super("Hex string mangler");
  }

  transformation(node: Node): Node {
    return astTransformHexString(node);
  }
}
