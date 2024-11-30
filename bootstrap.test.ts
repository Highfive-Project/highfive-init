import { beforeEach, expect, it, vi } from 'vitest';
import { fs, vol } from 'memfs';
import mock from 'mock-require';

mock('node:fs', {
  ...require('node:fs'),
  mkdirSync: fs.mkdirSync,
  writeFileSync: fs.writeFileSync,
  existsSync: fs.existsSync,
  renameSync: fs.renameSync,
});

mock('node:readline', {
  createInterface: () => {
    return {
      question: vi.fn().mockImplementation((_question, cb) => {
        cb("dummy");
      }),
      close: vi.fn(),
    };
  }
});

const bootstrap = require('./bootstrap');

beforeEach(() => {
  vol.reset();
});

it('creates project directory', async () => {
  await bootstrap();

  expect(fs.existsSync("./highlightjs-dummy")).toBeTruthy();
  expect(fs.lstatSync("./highlightjs-dummy").isDirectory()).toBeTruthy();
  expect(fs.readFileSync("./highlightjs-dummy/README.md", "utf8").includes("highlightjs-dummy")).toBeTruthy();
});

