import { Parser } from "acorn";
import { generate } from "astring";
import { readFileSync } from "fs";
import { astTransformIdentity } from "../../transformers/ast/identity";
import { astTransformVariableMangle } from "../../transformers/ast/variableMangle";
import { outputTransformIdentity } from "../../transformers/output/identity";

const basePath = "src/test/fixtures";

const fixtures = [
  `${basePath}/caesarCipher.js`,
  `${basePath}/railFenceCipher.js`,
  `${basePath}/variableMangleArrowExpressionBug.js`,
  `${basePath}/variableMangleArrowUnpackingBug.js`,
];

fixtures.forEach((fixture) => {
  test("variableMangle for: " + fixture, () => {
    const contents = readFileSync(fixture).toString();
    verifyAst(contents);
  });
});

test("ArrowFuncitonObjectDeconstructionBug", () => {
  const contents = "const a = 1;1 === ({a}).a ";
  verifyAst(contents);
});

test("ObjectDeconstructionDiscardedQualifierBug", () => {
  const contents = "params = {a: 1}; const {a} = params; a === 1;";
  verifyAst(contents);
});

const verifyAst = (contents: string) => {
  const ast = Parser.parse(contents, { ecmaVersion: 2020 });
  const astMangled = astTransformVariableMangle(astTransformIdentity(ast));
  const output = outputTransformIdentity(generate(astMangled));
  expect(eval(output)).toEqual(eval(contents));
};
