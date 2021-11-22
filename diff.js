import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const normalizeFilePath = (filepath) => readFileSync(path.resolve(process.cwd(), filepath), { encoding: 'ascii' });

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(normalizeFilePath(filepath1));
  const file2 = JSON.parse(normalizeFilePath(filepath2));

  const mergedObj = { ...file1, ...file2 };
  const keys = Object.keys(mergedObj).sort();

  const result = [];
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (_.has(file1, key) && _.has(file2, key) && file1[key] === file2[key]) {
      result.push(`    ${key}: ${file1[key]}`);
    } else if (_.has(file1, key) && _.has(file2, key) && file1[key] !== file2[key]) {
      result.push(`  - ${key}: ${file1[key]}`);
      result.push(`  + ${key}: ${file2[key]}`);
    } else if (!_.has(file1, key)) {
      result.push(`  + ${key}: ${file2[key]}`);
    } else if (!_.has(file2, key)) {
      result.push(`  - ${key}: ${file1[key]}`);
    }
  }

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
