# highlightjs-HIGHFIVE_LANG_SLUG

Highlight.js syntax for HIGHFIVE_LANG_NAME

## Use in browser

Get `hljs-HIGHFIVE_LANG_SLUG.min.js` from latest release or build
`hljs-HIGHFIVE_LANG_SLUG.min.js` with:

```
yarn build
```

Include in HTML page:

```html
<pre>
  <code class="language-HIGHFIVE_LANG_SLUG">
    HIGHFIVE_LANG_SLUG code...
  </code>
</pre>
...
<link rel="stylesheet" href="path/to/theme.css" />
<script src="path/to/highlight.min.js"></script>
<script src="path/to/hljs-HIGHFIVE_LANG_SLUG.min.js"></script>
<script>
  hljs.registerLanguage("HIGHFIVE_LANG_SLUG", HIGHFIVE_HIGHLIGHTER_NAME);
  hljs.highlightAll();
</script>
```

## Use in Node

Install packages:

```
npm install highlight.js
npm install highlightjs-HIGHFIVE_LANG_SLUG
```

Import modules in Node:

```js
const hljs = require("highlight.js");
const HIGHFIVE_HIGHLIGHTER_NAME = require("highlightjs-HIGHFIVE_LANG_SLUG");

const code = `...`;

hljs.registerLanguage("HIGHFIVE_LANG_SLUG", HIGHFIVE_HIGHLIGHTER_NAME);
const result = hljs.highlight(code, {
  language: "HIGHFIVE_LANG_SLUG",
});
```
