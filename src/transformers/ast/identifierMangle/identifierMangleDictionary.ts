import { full, fullAncestor } from "acorn-walk";
import StringGenerator from "../utils/stringGenerator";

export default abstract class IdentifierMangleDictionary {
  static transform(data: acorn.Node): acorn.Node {
    data = this.removeVariableDeclarationIdentifiers(data);
    data = this.mangleVariableNames(data);
    data = this.insertVarsDeclaration(data);

    return data;
  }

  private static removeVariableDeclarationIdentifiers(data: acorn.Node) {
    fullAncestor(data, (node: acorn.Node, ancestors: acorn.Node[]) => {
      if (
        ancestors.length > 1 &&
        ancestors[ancestors.length - 2].type !== "property"
      ) {
        if (node.type === "VariableDeclaration") {
          // exclude 'const {a} = params' case
          //@ts-ignore
          if (
            //@ts-ignore
            node.declarations.filter(
              //@ts-ignore
              (declaration: acorn.Node) =>
                //@ts-ignore
                declaration.id.type === "ObjectPattern"
            ).length === 0
          ) {
            //@ts-ignore
            node.kind = "";
          }
        }
      }
    });

    return data;
  }

  private static mangleVariableNames(data: acorn.Node) {
    const varsLookup: { [key: string]: string[] } = {};

    full(data, (node: acorn.Node) => {
      if (node.type === "VariableDeclarator") {
        const generated = `vars["${StringGenerator.next()}"]`;

        // @ts-ignore
        if (varsLookup[node.id.name] === undefined) {
          // @ts-ignore
          varsLookup[node.id.name] = [];
        }

        // @ts-ignore
        varsLookup[node.id.name].unshift(generated);

        // @ts-ignore
        node.id.name = generated;
      }
    });

    fullAncestor(data, (node: acorn.Node, ancestors: acorn.Node[]) => {
      if (
        ancestors.length !== 1 &&
        // do not replace arrow function arguments
        ancestors[ancestors.length - 2].type !== "ArrowFunctionExpression" &&
        // do not replace object deconstruction
        ancestors[ancestors.length - 2].type !== "ObjectPattern"
      ) {
        // @ts-ignore
        if (node.type === "Identifier" && node.name in varsLookup) {
          // @ts-ignore
          if (varsLookup[node.name].length > 1) {
            // @ts-ignore
            node.name = varsLookup[node.name].pop();
          } else {
            // @ts-ignore
            node.name = varsLookup[node.name][0];
          }
        }
      }

      if (
        ancestors.length !== 1 &&
        ancestors[ancestors.length - 2].type === "ObjectExpression" &&
        node.type === "Property"
      ) {
        // @ts-ignore
        node.shorthand = false;
      }
    });

    return data;
  }

  private static insertVarsDeclaration(data: acorn.Node) {
    // copied from acorn, adds declaration at the start of
    // the program: 'let vars = {};'
    const node = JSON.parse(
      '{"type":"VariableDeclaration","start":0,"end":13,"declarations":[{"type":"VariableDeclarator","start":4,"end":13,"id":{"type":"Identifier","start":4,"end":8,"name":"vars"},"init":{"type":"ObjectExpression","start":11,"end":13,"properties":[]}}],"kind":"let"}'
    );

    // when trying simply 'data.body.unshift({});'
    // following error occured 'TypeError: this[statement.type] is not a function'
    // so I'm parsing it away using JSON
    const parsed = JSON.parse(JSON.stringify(data));
    parsed.body.unshift(node);
    return parsed;
  }
}
