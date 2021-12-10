import yaml from 'js-yaml';

const jsonParseData = (data) => JSON.parse(data);
const yamlParseData = (data) => yaml.load(data);

const parseData = (data, ext) => {
  if (ext === '.json') {
    return jsonParseData(data);
  }

  if (ext === '.yml' || ext === '.yaml') {
    return yamlParseData(data);
  }

  throw new Error(`${ext}: invalid file format`);
};

export default parseData;
