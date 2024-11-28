/*
Language: HIGHFIVE_LANG_NAME
Description: Syntax for HIGHFIVE_LANG_NAME
Website: TODO
Category: TODO
*/
module.exports = function (hljs) {
  const KEYWORD = {
    match: /\b(?:hello|world)\b/,
    scope: "keyword",
  };

  return {
    contains: [KEYWORD, hljs.NUMBER_MODE],
  };
};
