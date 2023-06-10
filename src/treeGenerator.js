import _ from 'lodash';
import STATUSES from './const.js';

const areAllObjects = (first, second) => {
  const isFirstObject = _.isPlainObject(first);
  const isSecondObject = _.isPlainObject(second);
  return isFirstObject && isSecondObject;
};

const buildTree = (data1, data2) => {
  const keys = Object.keys(data1).concat(Object.keys(data2));
  const allProperties = _.sortBy(_.uniq(keys));

  return allProperties.reduce((acc, key) => {
    const firstValue = data1[key];
    const secondValue = data2[key];

    const diff = (() => {
      if (!_.has(data2, key)) {
        return { type: STATUSES.DELETED, key, value: firstValue };
      }

      if (!_.has(data1, key)) {
        return { type: STATUSES.ADDED, key, value: secondValue };
      }

      if (areAllObjects(firstValue, secondValue)) {
        const children = buildTree(firstValue, secondValue);

        return { type: STATUSES.NESTED, key, children };
      }

      if (firstValue !== secondValue) {
        return {
          type: STATUSES.NOT_EQUAL, key, value: firstValue, secondValue,
        };
      }

      return { type: STATUSES.EQUAL, key, value: firstValue };
    })();

    return { ...acc, [key]: diff };
  }, {});
};

export default buildTree;
