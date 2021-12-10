const normalizeValue = (val) => {
  if (val === 'true' || val === true) return true;
  if (val === 'false' || val === false) return false;
  if (val === 'null' || val === null) return null;
  if (!Number.isNaN(val * 1) && val !== '') return Number(val);
  if (typeof val === 'object') return '[complex value]';
  return `'${val}'`;
};

const plain = (ast) => {
  const iter = (currentValue, path) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }

    const lines = currentValue
      .map(({
        key, status, value,
      }) => {
        if (status === 'nested') {
          return iter(value, [...path, key]);
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
