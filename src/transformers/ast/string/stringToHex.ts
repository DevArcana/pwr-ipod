import acorn from "acorn";
import { full } from "acorn-walk";

export default abstract class StringToHex {
  static transform(data: acorn.Node): acorn.Node {
    full(data, (node: acorn.Node) => {
      if (
        this.isLiteral(node) &&
        this.isStringLiteral(node as acornTypes.NodeLiteral)
      ) {
        node = this.nodeToHex(node as acornTypes.NodeLiteral);
      }
    });

    return data;
  }

  static reverse(data: acorn.Node): acorn.Node {
    full(data, (node: acorn.Node) => {
      if (
        this.isLiteral(node) &&
        this.isStringLiteral(node as acornTypes.NodeLiteral)
      ) {
        node = this.nodeFromHex(node as acornTypes.NodeLiteral);
      }
    });

    return data;
  }

  private static isLiteral(node: acorn.Node): boolean {
    return node.type === "Literal";
  }

  private static isStringLiteral(node: acornTypes.NodeLiteral): boolean {
    return (
      (node.raw[0] === '"' && node.raw[node.raw.length - 1] === '"') ||
      (node.raw[0] === "'" && node.raw[node.raw.length - 1] === "'")
    );
  }

  private static nodeToHex(node: acornTypes.NodeLiteral): acorn.Node {
    node.value = this.stringToHex(node.value);
    node.raw = `"${node.value}"`;
    return node as acorn.Node;
  }

  private static stringToHex(str: string): string {
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

  private static nodeFromHex(node: acornTypes.NodeLiteral): acorn.Node {
    node.value = this.hexToString(node.value);
    node.raw = `"${node.value}"`;
    return node as acorn.Node;
  }

  private static hexToString(str: string): string {
    if (str === "") {
      return "";
    }

    const matchAllHexGroups = /(\\x[a-fA-F0-9]{2})/g;
    return str.replace(matchAllHexGroups, (hexSubstring) =>
      String.fromCharCode(parseInt(hexSubstring.slice(2), 16))
    );
  }
}
