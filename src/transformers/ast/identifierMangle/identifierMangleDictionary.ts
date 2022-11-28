import { full, fullAncestor } from "acorn-walk";
import { NodeTypes } from "../nodeTypes";
import StringGenerator from "../utils/stringGenerator";

export default abstract class IdentifierMangleDictionary {
  static transform(data: acorn.Node): acorn.Node {
    data = this.removeVariableDeclarationIdentifiers(data);
    data = this.mangleVariableNames(data);
    data = this.insertVarsDeclaration(data);

    return data;
  }

  static reverse(data: acorn.Node): acorn.Node {
    data = this.restoreVariableDeclarationIdentifiers(data);
    data = this.unmangleVariableNames(data);
    data = this.deleteVarsDeclaration(data);

    return data;
  }

  private static removeVariableDeclarationIdentifiers(data: acorn.Node) {
    fullAncestor(data, (node: acorn.Node, ancestors: acorn.Node[]) => {
      if (
        ancestors.length > 1 &&
        ancestors[ancestors.length - 2].type !== NodeTypes.Property
      ) {
        if (node.type === NodeTypes.VariableDeclaration) {
          // exclude 'const {a} = params' case
          //@ts-ignore
          if (
            //@ts-ignore
            node.declarations.filter(
              //@ts-ignore
              (declaration: acorn.Node) =>
                //@ts-ignore
                declaration.id.type === NodeTypes.ObjectPattern
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

  private static restoreVariableDeclarationIdentifiers(data: acorn.Node) {
    fullAncestor(data, (node: acorn.Node, ancestors: acorn.Node[]) => {
      if (
        ancestors.length > 1 &&
        ancestors[ancestors.length - 2].type !== NodeTypes.Property
      ) {
        if (node.type === NodeTypes.VariableDeclaration) {
          // exclude 'const {a} = params' case
          //@ts-ignore
          if (
            //@ts-ignore
            node.declarations.filter(
              //@ts-ignore
              (declaration: acorn.Node) =>
                //@ts-ignore
                declaration.id.type === NodeTypes.ObjectPattern
            ).length === 0
          ) {
            //@ts-ignore
            node.kind = "let";
          }
        }
      }
    });

    return data;
  }

  private static mangleVariableNames(data: acorn.Node) {
    const varsLookup: { [key: string]: string[] } = {};

    //search for declarations
    full(data, (node: acorn.Node) => {
      if (node.type === NodeTypes.VariableDeclarator) {
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

    // change vars using lookup
    fullAncestor(data, (node: acorn.Node, ancestors: acorn.Node[]) => {
      if (
        ancestors.length !== 1 &&
        // do not replace arrow function arguments
        ancestors[ancestors.length - 2].type !==
          NodeTypes.ArrowFunctionExpression &&
        // do not replace object deconstruction
        ancestors[ancestors.length - 2].type !== NodeTypes.ObjectPattern
      ) {
        // @ts-ignore
        if (node.type === NodeTypes.Identifier && node.name in varsLookup) {
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
        ancestors[ancestors.length - 2].type === NodeTypes.ObjectExpression &&
        node.type === NodeTypes.Property
      ) {
        // @ts-ignore
        node.shorthand = false;
      }
    });

    return data;
  }

  private static unmangleVariableNames(data: acorn.Node) {
    const varsLookup: { [key: string]: string[] } = {};
    const counters: {[type: string]: number} = {};

    //search for declarations
    full(data, (node: acorn.Node) => {
      if (node.type === NodeTypes.VariableDeclarator) {
        // @ts-ignore
        if (varsLookup[node.id.name] === undefined) {
          // @ts-ignore
          varsLookup[node.id.name] = [];
        }

        // @ts-ignore
        if (!node.id.name.startsWith("vars[")) {
          return;
        }

        // @ts-ignore
        const type = node.init.type as string;
        if (!(type in counters)) {
          counters[type] = 0;
        }
        counters[type]++;
        const generated = `${type.toLowerCase()}${counters[type]}`;

        // @ts-ignore
        varsLookup[node.id.name].unshift(generated);

        // @ts-ignore
        node.id.name = generated;
      }
    });

    // change vars using lookup
    fullAncestor(data, (node: acorn.Node, ancestors: acorn.Node[]) => {
      if (
        ancestors.length !== 1 &&
        // do not replace arrow function arguments
        ancestors[ancestors.length - 2].type !==
        NodeTypes.ArrowFunctionExpression &&
        // do not replace object deconstruction
        ancestors[ancestors.length - 2].type !== NodeTypes.ObjectPattern
      ) {
        // @ts-ignore
        if (node.type === NodeTypes.Identifier && node.name in varsLookup) {
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
        ancestors[ancestors.length - 2].type === NodeTypes.ObjectExpression &&
        node.type === NodeTypes.Property
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

  private static deleteVarsDeclaration(data: acorn.Node) {
    const parsed = JSON.parse(JSON.stringify(data));
    parsed.body.shift();
    return parsed;
  }
}
