import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatAst = (ast, formatter) => {
  if (formatter === 'stylish') {
    return stylish(ast);
  }

  if (formatter === 'plain') {
    return plain(ast);
  }

  if (formatter === 'json') {
    return json(ast);
  }

  throw new Error(`formatter "${formatter}" is not defined`);
};

export default formatAst;
