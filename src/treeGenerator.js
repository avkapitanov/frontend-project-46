import _ from 'lodash';
import { STATUSES } from './const.js';

const buildTree = (data1, data2) => {
  const keys = Object.keys(data1).concat(Object.keys(data2));
  const allProperties = _.sortBy(_.uniq(keys));

  return allProperties.reduce((acc, key) => {
    const firstValue = data1[key];
    const secondValue = data2[key];

    if (!_.has(data2, key)) {
      acc.push({
        type: STATUSES.DELETED,
        key,
        value: firstValue,
      });
      return acc;
    }

    if (!_.has(data1, key)) {
      acc.push({
        type: STATUSES.ADDED,
        key,
        value: secondValue,
      });
      return acc;
    }

    if (firstValue !== secondValue) {
      acc.push({
        type: STATUSES.NOT_EQUAL,
        key,
        value: firstValue,
        secondValue,
      });
      return acc;
    }

    acc.push({
      type: STATUSES.EQUAL,
      key,
      value: firstValue,
    });

    return acc;
  }, []);
};

export default buildTree;
