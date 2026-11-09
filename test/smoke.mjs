#!/usr/bin/env node
/**
 * smoke.mjs — no-dependency sanity check.
 *
 * The package ships hand-maintained ESM, so the cheapest useful test is a
 * structural one: every documented component must be exported, and the type
 * declarations must mention each of them. Runs without react installed.
 */
import fs from 'node:fs';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.join(here, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const EXPECTED = ['Button', 'Card', 'Badge', 'Input', 'Avatar', 'Spinner', 'Progress', 'Modal', 'tokens'];

const src = read('dist/index.js');
const dts = read('dist/index.d.ts');
const pkg = JSON.parse(read('package.json'));

const missingJs = EXPECTED.filter((n) => !new RegExp(`export (function|const) ${n}\\b`).test(src));
const missingTypes = EXPECTED.filter((n) => !dts.includes(n));
const problems = [];
if (missingJs.length) problems.push(`not exported from dist/index.js: ${missingJs.join(', ')}`);
if (missingTypes.length) problems.push(`missing from dist/index.d.ts: ${missingTypes.join(', ')}`);
if (pkg.main !== './dist/index.js') problems.push(`package.main is ${pkg.main}`);
if (!pkg.exports || !pkg.exports['.']) problems.push('package.exports[.] missing');
if (!pkg.exports || !pkg.exports['./adapters']) problems.push('package.exports[./adapters] missing');

if (problems.length) {
  console.error('smoke: FAIL');
  for (const p of problems) console.error(' - ' + p);
  process.exit(1);
}

console.log(`smoke: OK — ${EXPECTED.length} exports, ${pkg.name}@${pkg.version}`);
