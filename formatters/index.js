import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const astFormatting = (formatter, ast) => {
  if (formatter === 'plain') {
    return plain(ast);
  }

  if (formatter === 'json') {
    return json(ast);
  }

  return stylish(ast);
};

export default astFormatting;
