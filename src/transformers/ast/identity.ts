import acorn from "acorn";

export function astTransformIdentity(data: acorn.Node): acorn.Node {
  return data;
}
