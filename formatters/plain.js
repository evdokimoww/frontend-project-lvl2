import { isObject, normalizeValue } from '../src/supportFunctions.js';

const plain = (ast) => {
  const iter = (currentValue, path) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }

    const lines = currentValue
      .map(({
        key, status, value,
      }) => {
        if (status === 'identical') {
          if (isObject(value)) {
            return iter(value, [...path, key]);
          }
        }
        if (status === 'added') {
          return `Property '${[...path, key].join('.')}' was added with value: ${normalizeValue(value)}`;
        }

        if (status === 'changed') {
          return `Property '${[...path, key].join('.')}' was updated. From ${normalizeValue(value[0])} to ${normalizeValue(value[1])}`;
        }

        if (status === 'deleted') {
          return `Property '${[...path, key].join('.')}' was removed`;
        }

        return null;
      });
    return lines.filter((str) => str).join('\n');
  };

  return iter(ast, []);
};

export default plain;
