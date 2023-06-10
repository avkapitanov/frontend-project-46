import _ from 'lodash';
import { STATUSES } from '../const.js';

const processValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const format = (data, path = '') => Object.keys(data)
  .reduce((result, key) => {
    const {
      type, value, children, secondValue,
    } = data[key];

    const pathToProp = `${path}${key}`;

    switch (type) {
      case STATUSES.NESTED:
        return `${result}${format(children, `${pathToProp}.`)}`;
      case STATUSES.DELETED:
        return `${result}Property '${pathToProp}' was removed\n`;
      case STATUSES.ADDED:
        return `${result}Property '${pathToProp}' was added with value: ${processValue(value)}\n`;
      case STATUSES.EQUAL:
        return result;
      case STATUSES.NOT_EQUAL:
        return `${result}Property '${pathToProp}' was updated. From ${processValue(value)} to ${processValue(secondValue)}\n`;
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  }, '');

const plain = (diff) => format(diff).slice(0, -1);

export default plain;
