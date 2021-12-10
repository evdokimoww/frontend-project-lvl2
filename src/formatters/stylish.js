import _ from 'lodash';

const stylish = (ast) => {
  const iter = (currentValue, deep) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }

    const indent = '    ';
    const addStatusIndent = '  + ';
    const deleteStatusIndent = '  - ';

    const lines = currentValue
      .map(({
        key, status, value,
      }) => {
        if (status === 'changed') {
          const changed1 = `${indent.repeat(deep)}${deleteStatusIndent}${key}: ${_.isObject(value[0])
            ? iter(value[0], deep + 1)
            : value[0]}`;
          const changed2 = `${indent.repeat(deep)}${addStatusIndent}${key}: ${_.isObject(value[1])
            ? iter(value[1], deep + 1)
            : value[1]}`;
          return `${changed1}\n${changed2}`;
        }
        if (status === 'nested') {
          return `${indent.repeat(deep)}${indent}${key}: ${iter(value, deep + 1)}`;
        }
        if (status === 'added') {
          return `${indent.repeat(deep)}${addStatusIndent}${key}: ${_.isObject(value) ? iter(value, deep + 1) : value}`;
        }
        if (status === 'deleted') {
          return `${indent.repeat(deep)}${deleteStatusIndent}${key}: ${_.isObject(value) ? iter(value, deep + 1) : value}`;
        }
        return `${indent.repeat(deep)}${indent}${key}: ${value}`;
      });
    return [
      '{',
      ...lines,
      `${indent.repeat(deep)}}`,
    ].join('\n');
  };

  return iter(ast, 0);
};

export default stylish;
