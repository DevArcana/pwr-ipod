import { readFileSync, readdirSync } from "fs";

const dir = "src/test/fixtures/samples/";

readdirSync(dir).forEach((file) => {
  test(`if ${file} returns true`, () => {
    const contents = readFileSync(dir + file);
    expect(eval(contents.toString())).toBeTruthy();
  });
});
