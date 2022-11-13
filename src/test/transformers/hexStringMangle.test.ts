import { Parser } from "acorn";
import { generate } from "astring";
import { readdirSync, readFileSync } from "fs";
import { astTransformHexString } from "../../transformers/ast/hexString";

const dir = "src/test/fixtures/samples/";

readdirSync(dir).forEach((fixture) => {
  test("hexStringMangle for: " + fixture, () => {
    const contents = readFileSync(dir + fixture).toString();
    verifyAst(contents);
  });
});

const verifyAst = (contents: string) => {
  const ast = Parser.parse(contents, { ecmaVersion: 2020 });
  const astMangled = astTransformHexString(ast);
  const output = generate(astMangled);
  expect(eval(output)).toEqual(eval(contents));
};
