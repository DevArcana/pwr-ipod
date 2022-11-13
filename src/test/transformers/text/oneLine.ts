import { Parser } from "acorn";
import { generate } from "astring";
import { readdirSync, readFileSync } from "fs";
import { textTransformToOneLine } from "../../../transformers/text/oneLine";

const dir = "src/test/fixtures/samples/";

readdirSync(dir).forEach((fixture) => {
  test("oneline for: " + fixture, () => {
    const contents = readFileSync(dir + fixture).toString();
    verifyAst(contents);
  });
});

const verifyAst = (contents: string) => {
  const ast = Parser.parse(contents, { ecmaVersion: 2020 });
  const output = textTransformToOneLine(generate(ast));
  expect(eval(output)).toEqual(eval(contents));
};
