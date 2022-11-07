import { readFileSync } from "fs";

test("if fixture script returns true", () => {
  const contents = readFileSync("src/test/fixtures/railFenceCipher.js");
  const result = eval(contents.toString());
  expect(result).toBeTruthy();
});
