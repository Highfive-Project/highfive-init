# Release

## Prepare release commit

Update CHANGELOG and bump version in `package.json`.

Make a commit and push to GitHub repo.

## Generate release artifacts

Build minified standalone

```
yarn build
```

## Publish GitHub release

Publish a new release in GitHub repo.

Add `dist/hljs-HIGHFIVE_LANG_SLUG.min.js` minified standalone to release assets.

## Publish to NPM

Dry run release:

```
npm publish --dry-run
```

Release:

```
npm publish
```