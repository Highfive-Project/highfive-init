const fs = require("fs");
const path = require("path");
const hljs = require("highlight.js");
const HIGHFIVE_HIGHLIGHTER_NAME = require("../src/HIGHFIVE_LANG_SLUG.js");

const filePaths = ["basic/hello-world.txt"];

describe("HIGHFIVE_LANG_NAME syntax highlighting", () => {
  beforeAll(() => {
    hljs.registerLanguage("HIGHFIVE_LANG_SLUG", HIGHFIVE_HIGHLIGHTER_NAME);
  });

  test.each(filePaths)("highlights syntax for %s", (filePath) => {
    const code = fs.readFileSync(path.join(__dirname, filePath), "utf8");
    const result = hljs.highlight(code, {
      language: "HIGHFIVE_LANG_SLUG",
    });
    expect(result.value).toMatchSnapshot();
  });
});
