import fs from 'fs';
import path from 'path';
import parseFile from './fileParser.js';
import buildTree from './treeGenerator.js';
import formatResult from './formatters/index.js';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileFormat = (filepath) => path.extname(filepath).toLowerCase().slice(1);

const getDataFromFile = (pathToFile) => {
  const data = fs.readFileSync(pathToFile);

  return parseFile(data, getFileFormat(pathToFile));
};

const generateDiff = (filepath1, filepath2, format) => {
  const data1 = getDataFromFile(buildAbsolutePath(filepath1));
  const data2 = getDataFromFile(buildAbsolutePath(filepath2));

  const diff = buildTree(data1, data2);

  return formatResult(diff, format || 'stylish');
};

export default generateDiff;
