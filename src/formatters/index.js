import stylishFormat from './stylish.js';
import plainFormat from './plain.js';

const formatDiff = (diff, formatterName) => {
  switch (formatterName) {
    case 'stylish':
      return stylishFormat(diff);
    case 'plain':
      return plainFormat(diff);
    default:
      throw new Error(`Unknown formatter name - ${formatterName}`);
  }
};

export default formatDiff;
