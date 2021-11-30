export const isObject = (element) => typeof element === 'object';

export const normalizeValue = (val) => {
  if (val === 'true' || val === true) return true;
  if (val === 'false' || val === false) return false;
  if (val === 'null' || val === null) return null;
  if (!Number.isNaN(val * 1) && val !== '') return Number(val);
  if (typeof val === 'object') return '[complex value]';
  return `'${val}'`;
};
