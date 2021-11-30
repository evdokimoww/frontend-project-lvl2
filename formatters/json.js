const isObject = (element) => typeof element === 'object';

const normalizeValue = (val) => {
  if (val === 'true'
    || val === 'false'
    || val === 'null'
    || typeof val === 'boolean') return `${val}`;
  if (typeof val === 'string') return `'${val}'`;
  return '[complex value]';
};

const json = (ast) => {
  const iter = (current) => current.map((element) => {
    if (!isObject(element) || element === null) {
      return normalizeValue(element);
    }

    const result = {};
    result.key = element.key;
    result.status = element.status;
    result.value = isObject(element.value) ? iter(element.value) : element.value;

    return result;
  });

  return JSON.stringify(iter(ast));
};

export default json;
