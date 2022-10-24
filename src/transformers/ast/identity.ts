import acorn from "acorn";

export function astTransformIdentity (data: acorn.Node) {
  return data
}