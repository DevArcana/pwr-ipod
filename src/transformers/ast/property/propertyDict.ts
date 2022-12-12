import acorn from "acorn";
import { full } from "acorn-walk";
import { NodeTypes } from "../nodeTypes";

export default abstract class PropertyDict {
  static transform(data: acorn.Node): acorn.Node {
    full(data, (node: acorn.Node) => {
      if (node.type === NodeTypes.MemberExpression) {
        const exp = node as unknown as acornTypes.MemberExpression;
        const name = (exp.property as acornTypes.Identifier).name;
        // @ts-ignore
        delete exp.property["name"];

        exp.property.type = "Literal";

        (exp.property as acornTypes.Literal).value = name;
        (exp.property as acornTypes.Literal).raw = `"${name}"`;

        exp.computed = true;
      }
    });

    return data;
  }

  static reverse(data: acorn.Node): acorn.Node {
    full(data, (node: acorn.Node) => {
      if (node.type === NodeTypes.MemberExpression) {
        const exp = node as unknown as acornTypes.MemberExpression;

        exp.property.type = "Identifier";
        // @ts-ignore
        exp.property["name"] = (exp.property as acornTypes.Literal).value;

        exp.computed = false;
      }
    });

    return data;
  }
}
