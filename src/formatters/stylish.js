import _ from 'lodash';
import { STATUSES } from '../const.js';

const getIndent = (depth) => '    '.repeat(depth).slice(0, -2);

const stringify = (data, depth) => {
  if (_.isPlainObject(data)) {
    const output = Object.entries(data)
      .map(([key, value]) => format({ key, value, type: STATUSES.EQUAL }, depth + 1));

    return `{\n${output.join('')}${getIndent(depth)}  }`;
  }

  return `${data}`;
};

const format = (node, depth, formatChildren) => {
  const {
    type, key, value, children, secondValue,
  } = node;

  let result;
  switch (type) {
    case STATUSES.NESTED:
      result = formatChildren(children, depth + 1);
      return `${getIndent(depth)}  ${key}: ${result}\n`;
    case STATUSES.DELETED:
      result = stringify(value, depth);
      return `${getIndent(depth)}- ${node.key}: ${result}\n`;
    case STATUSES.ADDED:
      result = stringify(value, depth);
      return `${getIndent(depth)}+ ${key}: ${result}\n`;
    case STATUSES.EQUAL:
      result = stringify(value, depth);
      return `${getIndent(depth)}  ${node.key}: ${result}\n`;
    case STATUSES.NOT_EQUAL:
      return `${getIndent(depth)}- ${key}: ${stringify(value, depth)}\n`
        + `${getIndent(depth)}+ ${key}: ${stringify(secondValue, depth)}\n`;
    default:
      throw new Error(`Unknown node type: ${type}`);
  }
};

const stylish = (diff) => {
  const formatDeeper = (data, depth = 1) => Object.keys(data)
    .reduce((result, diffKey, ind, list) => {
      const node = data[diffKey];
      const diffNode = format(node, depth, formatDeeper);
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
