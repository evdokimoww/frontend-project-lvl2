import yaml from 'js-yaml';

const parseFile = (data, ext) => {
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(data);
  }

  return JSON.parse(data);
};

export default parseFile;
