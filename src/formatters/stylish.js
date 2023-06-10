import _ from 'lodash';
import { STATUSES } from '../const.js';

const getIndent = (depth) => '    '.repeat(depth).slice(0, -2);

const processValue = (data, depth) => {
  if (_.isPlainObject(data)) {
    const output = Object.entries(data)
      .map(([key, value]) => `${getIndent(depth + 1)}  ${key}: ${processValue(value, depth + 1)}\n`);

    return `{\n${output.join('')}${getIndent(depth)}  }`;
  }

  return `${data}`;
};

const formatValue = (node, depth, formatChildren) => {
  const {
    type, key, value, children, secondValue,
  } = node;

  let result;
  switch (type) {
    case STATUSES.NESTED:
      result = formatChildren(children, depth + 1);
      return `${getIndent(depth)}  ${key}: ${result}\n`;
    case STATUSES.DELETED:
      return `${getIndent(depth)}- ${node.key}: ${processValue(value, depth)}\n`;
    case STATUSES.ADDED:
      return `${getIndent(depth)}+ ${key}: ${processValue(value, depth)}\n`;
    case STATUSES.EQUAL:
      return `${getIndent(depth)}  ${node.key}: ${processValue(value, depth)}\n`;
    case STATUSES.NOT_EQUAL:
      return `${getIndent(depth)}- ${key}: ${processValue(value, depth)}\n`
        + `${getIndent(depth)}+ ${key}: ${processValue(secondValue, depth)}\n`;
    default:
      throw new Error(`Unknown node type: ${type}`);
  }
};

const stylish = (diff) => {
  const formatDeeper = (data, depth = 1) => Object.keys(data)
    .reduce((result, diffKey, ind, list) => {
      const node = data[diffKey];
      const diffNode = formatValue(node, depth, formatDeeper);
      const withoutEndingBraceStr = result.slice(0, result.length - 1);

      if (ind === list.length - 1) {
        const endBraceIndent = '    '.repeat(depth - 1);

        return `${withoutEndingBraceStr}${diffNode}${endBraceIndent}}`;
      }

      return `${withoutEndingBraceStr}${diffNode}}`;
    }, '{\n}');

  return formatDeeper(diff);
};

export default stylish;
