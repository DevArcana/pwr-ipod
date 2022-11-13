import { Node } from "acorn";
import { astTransformHexString } from "../../../transformers/ast/hexString";
import { AbstractAstMangler } from "./AbstractAstMangler";

export class HexStringMangler extends AbstractAstMangler {
  constructor() {
    super("Hex string mangler");
  }

  transformation(node: Node): Node {
    return astTransformHexString(node);
  }
}
