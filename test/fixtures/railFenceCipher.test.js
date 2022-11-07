import { readFileSync } from "fs";
import { assert, test } from "vitest";

test("if fixture script returns true", () => {
  const contents = readFileSync("test/fixtures/railFenceCipher.js");
  assert.equal(eval(contents.toString()), true);
});
