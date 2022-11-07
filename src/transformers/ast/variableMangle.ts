import { full, fullAncestor } from "acorn-walk";
import random from "random";

export function astTransformVariableMangle(data: acorn.Node): acorn.Node {
  data = removeVariableDeclarationIdentifiers(data);
  data = mangleVariableNames(data);
  data = insertVarsDeclaration(data);

  return data;
}

// TODO error (changing scope of variables, should handle it differently)

function mangleVariableNames(data: acorn.Node) {
  const mangler = new UnicodeMangler();
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

  full(data, (node: acorn.Node) => {
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
  });

  return data;
}

function removeVariableDeclarationIdentifiers(data: acorn.Node) {
  fullAncestor(data, (node: acorn.Node, ancestors: acorn.Node[]) => {
    if (node.type === "VariableDeclaration") {
      //@ts-ignore
      node.kind = "";
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
class UnicodeMangler {
  private rng = random.clone("asdf");
  private generated: string[] = [];
  constructor() {}

  next(): string {
    const hex = this.rng.int(4096, 100000000);

    let gen = `${hex.toString(16)}`;
    while (this.generated.includes(gen)) {
      gen += `${hex.toString(16)}`;
    }

    return `vars["${gen}"]`;
  }
}
