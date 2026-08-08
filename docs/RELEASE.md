# Release

## Make a release on GitHub

Bump the version number in `package.json`.

Add changelog entry in `CHANGELOG`.

Add a feat commit to bump the version and push to `main`.

Create a release on the [GitHub release page](https://github.com/Highfive-Project/highfive-init/releases). Add version number and details from changelog.


## Publish to NPM

Test publish with:

```
npm publish --dry-run
```

Publish with:

```
npm publish
```