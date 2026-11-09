# Contributing

There is no build step: edit `dist/index.js` and `dist/index.d.ts` together, then run `npm test`.

## Reporting a rendering difference

1. Run `npm run compat` **in the consumer project** (not in this repo) so the matrix describes the
   project that shows the problem.
2. Paste the printed matrix into the issue.
3. Paste the `COMPASS-DIAG:<base64>` line the script always prints. It is the same matrix plus the
   toolchain context of the run, gzip-compressed so it fits in a comment.

Without the matrix a rendering difference cannot be reproduced, because every component here is
style-inline and behaviour depends on the consumer's React version.

## Releasing

1. Bump `version` in `package.json` and add a `CHANGELOG.md` entry.
2. `git tag -a vX.Y.Z -m "vX.Y.Z" && git push origin main --tags`.
3. Consumers pin tags; `main` is not a release channel.
