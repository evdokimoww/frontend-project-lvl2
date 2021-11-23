import yaml from 'js-yaml';

const parseFile = (data, ext) => {
  let parse;

  if (ext === '' || ext === '.json') {
    parse = JSON.parse;
  } else if (ext === '.yml' || ext === '.yaml') {
    parse = yaml.load;
  }

  return parse(data);
};

export default parseFile;
