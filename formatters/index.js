// eslint-disable-next-line import/extensions
import stylish from './stylish.js';
// eslint-disable-next-line import/extensions
import plain from './plain.js';

const astFormatting = (formatter, ast) => {
  let formattedAst;

  if (formatter === 'stylish') {
    formattedAst = stylish(ast);
  }

  if (formatter === 'plain') {
    formattedAst = plain(ast);
  }

  return formattedAst;
};

export default astFormatting;
