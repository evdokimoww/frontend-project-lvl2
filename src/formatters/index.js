import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatAst = (ast, format) => {
  if (format === 'stylish') {
    return stylish(ast);
  }

  if (format === 'plain') {
    return plain(ast);
  }

  if (format === 'json') {
    return json(ast);
  }

  throw new Error(`formatter "${format}" is not defined`);
};

export default formatAst;
