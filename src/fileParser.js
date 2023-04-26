import yaml from 'js-yaml';

const parseFile = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown file format - ${format}`);
  }
};

export default parseFile;
