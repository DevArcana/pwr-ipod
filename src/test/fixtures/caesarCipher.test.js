import { readFileSync } from "fs";

test("if fixture script returns true", () => {
  const contents = readFileSync("src/test/fixtures/caesarCipher.js");
  expect(eval(contents.toString())).toBeTruthy();
});
