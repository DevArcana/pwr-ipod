import { Parser } from "acorn";
import { generate } from "astring";
import { readFileSync } from "fs";
import { Transformers } from "../../../transformers/ast/ast";

const dir = "src/test/fixtures/samples/";
const folds = 10;
const fixture = "caesarCipher.js"

test(`globalStrings ${folds} folds for: ` + fixture, () => {
  const contents = readFileSync(dir + fixture).toString();
  verifyAst(contents);
});

const verifyAst = (contents: string) => {
  let ast = Parser.parse(contents, { ecmaVersion: 2020 });
  for (var i = 0; i < folds; ++i) {
    ast = Transformers.Ast.String.Global.transform(ast);
  }

  const output = generate(ast);
  expect(eval(output)).toEqual(eval(contents));
};
