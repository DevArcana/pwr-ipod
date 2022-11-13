import { full, fullAncestor } from "acorn-walk";

export function astTransformVariableMangle(data: acorn.Node): acorn.Node {
  data = removeVariableDeclarationIdentifiers(data);
  data = mangleVariableNames(data);
  data = insertVarsDeclaration(data);

  return data;
}

function mangleVariableNames(data: acorn.Node) {
  const mangler = new RandomStringGenerator();
  const varsLookup: { [key: string]: string[] } = {};

  full(data, (node: acorn.Node) => {
    if (node.type === "VariableDeclarator") {
      const generated = mangler.next();

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

function removeVariableDeclarationIdentifiers(data: acorn.Node) {
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
            (declaration: acorn.Node) => declaration.id.type === "ObjectPattern"
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

function insertVarsDeclaration(data: any) {
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

// TODO find library that actually delivers seedable rng
class RandomStringGenerator {
  constructor() {}

  // https://stackoverflow.com/a/1349426
  private makeid(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  next(): string {
    const gen = this.makeid(12);
    return `vars["${gen}"]`;
  }
}
