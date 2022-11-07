import { Parser } from "acorn";
import { generate } from "astring";
import { readFileSync } from "fs";
import { assert, test } from "vitest";
import { astTransformIdentity } from "../../src/transformers/ast/identity";
import { astTransformVariableMangle } from "../../src/transformers/ast/variableMangle";
import { outputTransformIdentity } from "../../src/transformers/output/identity";

const fixtures = [
  "test/fixtures/caesarCipher.js",
  "test/fixtures/railFenceCipher.js",
];

fixtures.forEach((fixture) => {
  test("variableMangle for: " + fixture, () => {
    const contents = readFileSync(fixture).toString();
    const ast = Parser.parse(contents, { ecmaVersion: 2020 });

    const astMangled = astTransformVariableMangle(astTransformIdentity(ast));
    const output = outputTransformIdentity(generate(astMangled));
    assert.equal(eval(contents), eval(output));
  });
});

test("ArrowExpressionBug", () => {
  const contents = readFileSync(
    "test/fixtures/variableMangleArrowExpressionBug.js"
  ).toString();
  const ast = Parser.parse(contents, { ecmaVersion: 2020 });

  const astMangled = astTransformVariableMangle(astTransformIdentity(ast));
  const output = outputTransformIdentity(generate(astMangled));
  assert.equal(eval(contents), eval(output));
});

test("ArrowExpressionUnpackingBug", () => {
  const contents = readFileSync(
    "test/fixtures/variableMangleArrowUnpackingBug.js"
  ).toString();
  const ast = Parser.parse(contents, { ecmaVersion: 2020 });

  const astMangled = astTransformVariableMangle(astTransformIdentity(ast));
  const output = outputTransformIdentity(generate(astMangled));
  assert.equal(eval(contents), eval(output));
});

test("ArrowFuncitonObjectDeconstructionBug", () => {
  const contents = "const a = 1;1 === ({a}).a ";
  const ast = Parser.parse(contents, { ecmaVersion: 2020 });

  const astMangled = astTransformVariableMangle(astTransformIdentity(ast));
  const output = outputTransformIdentity(generate(astMangled));
  assert.equal(eval(contents), eval(output));
});

test("ObjectDeconstructionDiscardedQualifierBug", () => {
  const contents = "params = {a: 1}; const {a} = params; a === 1;";
  const ast = Parser.parse(contents, { ecmaVersion: 2020 });

  const astMangled = astTransformVariableMangle(astTransformIdentity(ast));
  const output = outputTransformIdentity(generate(astMangled));
  console.warn(output);
  console.log(contents);
  assert.equal(eval(contents), eval(output));
});
