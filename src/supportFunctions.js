export const isObject = (element) => typeof element === 'object';

export const normalizeValue = (val) => {
  if (typeof val === 'object') return '[complex value]';
  if (typeof val === 'string' && val !== 'true' && val !== 'false' && val !== 'null') return `'${val}'`;
  return val;
};
