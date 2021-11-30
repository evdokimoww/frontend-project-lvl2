export const isObject = (element) => typeof element === 'object';

export const normalizeValue = (val) => {
  if (val === 'true'
    || val === 'false'
    || val === 'null'
    || typeof val === 'boolean'
    || typeof val === 'number') return val;
  if (typeof val === 'string') return `'${val}'`;
  return '[complex value]';
};
