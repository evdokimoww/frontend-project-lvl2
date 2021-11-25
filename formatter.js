const isObject = (element) => typeof element === 'object';

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
        key, level, status, value,
      }) => {
        if (status === 'changed') {
          const changed1 = `${indent.repeat(level)}${deleteStatusIndent}${key}: ${isObject(value[0])
            ? iter(value[0], deep + 1)
            : value[0]}`;
          const changed2 = `${indent.repeat(level)}${addStatusIndent}${key}: ${isObject(value[1])
            ? iter(value[1], deep + 1)
            : value[1]}`;
          return `${changed1}\n${changed2}`;
        }

        let statusIndent;
        if (status === 'added') {
          statusIndent = addStatusIndent;
        }
        if (status === 'deleted') {
          statusIndent = deleteStatusIndent;
        }
        if (status === 'identical') {
          statusIndent = indent;
        }
        return `${indent.repeat(level)}${statusIndent}${key}: ${isObject(value) ? iter(value, deep + 1) : value}`;
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
