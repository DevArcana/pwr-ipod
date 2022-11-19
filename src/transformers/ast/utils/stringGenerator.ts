// TODO find library that actually delivers seedable rng
export default class StringGenerator {
  // https://stackoverflow.com/a/1349426
  private static makeid(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static next(): string {
    return this.makeid(12);
  }
}
