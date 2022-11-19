import IdentifierMangleDictionary from "./identifierMangle/identifierMangleDictionary";
import StringToHex from "./string/stringToHex";

export namespace Transformers {
  export namespace Ast {
    export namespace IdentifierMangle {
      export const Dictionary = IdentifierMangleDictionary;
    }

    export namespace String {
      export const HexString = StringToHex;
    }
  }
}
