import { describe, test, expect } from '@jest/globals';

import path from 'path';
import { readFileSync } from 'fs';

import generateDiff from '../src/main.js';

const dirname = process.cwd();
const getAbsolutePath = (filename) => path.join(dirname, '__fixtures__', filename);

describe('Generate Diff', () => {
  const pathOfExpectedValue = getAbsolutePath('plain.txt');
  const expected = readFileSync(pathOfExpectedValue, 'utf-8');

  test('Plain files', () => {
    const filepath1 = getAbsolutePath('file1.json');
    const filepath2 = getAbsolutePath('file2.json');

    const result = generateDiff(filepath1, filepath2, '');

    expect(result).toBe(expected);
  });
});
