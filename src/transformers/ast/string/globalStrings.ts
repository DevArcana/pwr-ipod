import acorn from "acorn";
import { full } from "acorn-walk";
import { NodeTypes } from "../nodeTypes";
import StringGenerator from "../utils/stringGenerator";

export default abstract class GlobalStrings {
  static transform(data: acorn.Node): acorn.Node {
    const lookup: { [key: string]: string } = {};
    const lookupName = StringGenerator.next();

    full(data, (node: acorn.Node) => {
      if (node.type === NodeTypes.Literal) {
        // @ts-ignore
        lookup[node.value] = StringGenerator.next();

        node.type = NodeTypes.MemberExpression;
        // @ts-ignore
        node["object"] = {
          type: NodeTypes.Identifier,
          start: 1,
          end: 2,
          name: lookupName,
        };

        // @ts-ignore
        node["property"] = {
          type: NodeTypes.Literal,
          start: 1,
          end: 2,
          // @ts-ignore
          value: lookup[node.value],
          // @ts-ignore
          raw: `"${lookup[node.value]}"`,
        };

        // @ts-ignore
        node["computed"] = true;
        // @ts-ignore
        node["optional"] = false;

        // @ts-ignore
        delete node.value;
        // @ts-ignore
        delete node.raw;
      }
    });

    data = this.insertLookup(data, lookup, lookupName);

    return data;
  }

  static reverse(data: acorn.Node): acorn.Node {
    const dictionaries: { [name: string]: { [key: string]: string } } = {};

    // cache all dictionaries
    full(data, (node: acorn.Node) => {
      if (node.type === NodeTypes.VariableDeclaration) {
        // @ts-ignore
        if (node.declarations != undefined && node.declarations.length > 0) {
          // @ts-ignore
          const declaration = node.declarations[0];
          if (declaration.type == "VariableDeclarator" && declaration.init.type == "ObjectExpression") {
            const dictionary: { [key: string]: string } = {};
            declaration.init.properties.forEach((prop: acornTypes.Property) => {
              if (prop.type != "Property") return;
              // @ts-ignore
              const key = prop.key["value"];
              // @ts-ignore
              const value = prop.value["value"];
              dictionary[key] = value;
            });

            if (Object.keys(dictionary).length > 0) {
              dictionaries[declaration.id.name] = dictionary;
            }
          }
        }
      }
    });

    full(data, (node: acorn.Node) => {
      if (node.type === NodeTypes.MemberExpression) {
        // @ts-ignore
        if (node.object.type != "Identifier") {
          return;
        }

        // @ts-ignore
        const name = node.object.name;
        // @ts-ignore
        const value = node.property.value;

        if (!(name in dictionaries)) {
          return;
        }

        // @ts-ignore
        node["computed"] = false;
        node.type = "Literal";
        // @ts-ignore
        node.value = dictionaries[name][value];

        // @ts-ignore
        if (node.value == undefined) {
          console.log(node)
          console.log(name + " : " + value)
          console.log(dictionaries[name])
        }
      }
    });

    // @ts-ignore
    data.body.shift();
    
    return data;
  }

  private static insertLookup(
    data: acorn.Node,
    lookup: { [key: string]: string },
    lookupName: string,
  ) {
    const properties = this.lookupToString(lookup);
    const node = JSON.parse(
      `{"type":"VariableDeclaration","start":0,"end":13,"declarations":[{"type":"VariableDeclarator","start":4,"end":13,"id":{"type":"Identifier","start":4,"end":8,"name":"${lookupName}"},"init":{"type":"ObjectExpression","start":11,"end":13,"properties":${properties}}}],"kind":"let"}`,
    );

    // when trying simply 'data.body.unshift({});'
    // following error occured 'TypeError: this[statement.type] is not a function'
    // so I'm parsing it away using JSON
    const parsed = JSON.parse(JSON.stringify(data));
    parsed.body.unshift(node);
    return parsed;
  }

  private static lookupToString(lookup: { [key: string]: string }) {
    let result: any[] = [];
    for (var key in lookup) {
      if (lookup.hasOwnProperty(key)) {
        result.push({
          type: NodeTypes.Property,
          start: 1,
          end: 2,
          method: false,
          shorthand: false,
          computed: false,
          key: {
            type: NodeTypes.Literal,
            start: 1,
            end: 2,
            value: lookup[key],
            raw: `"${lookup[key]}"`,
          },
          value: {
            type: NodeTypes.Literal,
            start: 1,
            end: 2,
            value: key,
            raw: `"${key}"`,
          },
          kind: "init",
        });
      }
    }

    return JSON.stringify(result);
  }
}
