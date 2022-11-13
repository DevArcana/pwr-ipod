import acorn from "acorn";
import { full } from "acorn-walk";

export function astTransformHexString(data: acorn.Node): acorn.Node {
  full(data, (node: acorn.Node) => {
    if (isLiteral(node) && isStringLiteral(node as acornTypes.NodeLiteral)) {
      node = transform(node as acornTypes.NodeLiteral);
    }
  });
  return data;
}

function isLiteral(node: acorn.Node): boolean {
  return node.type === "Literal";
}

function isStringLiteral(node: acornTypes.NodeLiteral): boolean {
  return node.raw[0] === '"' && node.raw[node.raw.length - 1] === '"';
}

function transform(node: acornTypes.NodeLiteral): acorn.Node {
  node.value = stringToHex(node.value);
  node.raw = `"${node.value}"`;
  return node as acorn.Node;
}

function stringToHex(str: string): string {
  if (str === "") {
    return "";
  }

  return str
    .toString()
    .split("")
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
    .map((c) => `\\x${c}`)
    .join("");
}
