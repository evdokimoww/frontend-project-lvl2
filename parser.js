import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filepath) => {
  const format = path.extname(filepath);
  const data = readFileSync(path.resolve(process.cwd(), filepath), { encoding: 'ascii' });

  let parse;

  if (format === '' || format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }

  return parse(data);
};

export default parseFile;
