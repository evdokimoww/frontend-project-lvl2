import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath1), {encoding: 'ascii'}));
  const file2 = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath2), {encoding: 'ascii'}));

  const mergedObj = Object.assign({}, file1, file2);
  const keys = Object.keys(mergedObj).sort();

  const result = [];
  for (const key of keys) {
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