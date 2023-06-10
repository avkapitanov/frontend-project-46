import { describe, test, expect } from '@jest/globals';

import path from 'path';
import { readFileSync } from 'fs';

import generateDiff from '../src/main.js';

const dirname = process.cwd();
const getAbsolutePath = (filename) => path.join(dirname, '__fixtures__', filename);

describe.each([['stylish'], ['plain'], ['json']])('Test %s formatter', (formatter) => {
  const pathOfExpectedValue = getAbsolutePath(`${formatter}.txt`);
  const expected = readFileSync(pathOfExpectedValue, 'utf-8');

  test.each([['json'], ['yml']])('%s files comparison', (extension) => {
    const filepath1 = getAbsolutePath(`file1.${extension}`);
    const filepath2 = getAbsolutePath(`file2.${extension}`);

    const result = generateDiff(filepath1, filepath2, formatter);

    expect(result).toBe(expected);
  });
});
