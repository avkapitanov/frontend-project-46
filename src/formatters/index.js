import stylishFormat from './stylish.js';

const formatDiff = (diff, formatterName) => {
  switch (formatterName) {
    case 'stylish':
      return stylishFormat(diff);
    default:
      throw new Error(`Unknown formatter name - ${formatterName}`);
  }
};

export default formatDiff;
