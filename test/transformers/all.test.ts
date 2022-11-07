import { Parser } from "acorn";
import { generate } from "astring";
import { readFileSync } from "fs";
import { assert, test } from "vitest";
import { astTransformIdentity } from "../../src/transformers/ast/identity";
import { astTransformVariableMangle } from "../../src/transformers/ast/variableMangle";
import { outputTransformIdentity } from "../../src/transformers/output/identity";

test("variableMangle", () => {
  const contents = readFileSync("test/fixtures/caesarCipher.js").toString();
  const ast = Parser.parse(contents, { ecmaVersion: 2020 });

  const astMangled = astTransformVariableMangle(astTransformIdentity(ast));
  const output = outputTransformIdentity(generate(astMangled));
  console.log(output);
  assert.equal(eval(contents), eval(output));
});
