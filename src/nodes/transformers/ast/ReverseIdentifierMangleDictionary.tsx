import { Node } from "acorn";
import { Transformers } from "../../../transformers/ast/ast";
import { AbstractAstComponent } from "./AbstractAstComponent";

export class ReverseIdentifierMangleDictionary extends AbstractAstComponent {
  constructor() {
    super("Dictionary UNmangler");
  }

  transformation(node: Node): Node {
    return Transformers.Ast.IdentifierMangle.Dictionary.reverse(node);
  }
}
