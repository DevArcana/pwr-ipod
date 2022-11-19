export default abstract class AstTransfomer {
  abstract transform(data: acorn.Node): acorn.Node;
}
