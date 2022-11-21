import IdentifierMangleDictionary from "./identifierMangle/identifierMangleDictionary";
import PropertyDict from "./property/propertyDict";
import GlobalStrings from "./string/globalStrings";
import StringToHex from "./string/stringToHex";

export namespace Transformers {
  export namespace Ast {
    export namespace IdentifierMangle {
      export const Dictionary = IdentifierMangleDictionary;
    }

    export namespace String {
      export const HexString = StringToHex;
      export const Global = GlobalStrings;
    }

    export const Property = PropertyDict;
  }
}
