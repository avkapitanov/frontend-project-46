import { STATUSES } from './const.js';

// eslint-disable-next-line no-unused-vars
const formatResult = (diff, format = 'text') => {
  const diffObj = Object.keys(diff)
    .reduce((acc, diffKey) => {
      const {
        type, key, value, secondValue,
      } = diff[diffKey];

      switch (type) {
        case STATUSES.DELETED:
          return `${acc}  - ${key}: ${value}\n`;
        case STATUSES.ADDED:
          return `${acc}  + ${key}: ${value}\n`;
        case STATUSES.EQUAL:
          return `${acc}  ${key}: ${value}\n`;
        case STATUSES.NOT_EQUAL:
          return `${acc}  - ${key}: ${value}\n`
            + `  + ${key}: ${secondValue}\n`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    }, '');

  return `{\n${diffObj}}`;
};

export default formatResult;
