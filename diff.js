import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'fs';
import parseFile from './parser.js';
import astFormatting from './formatters/index.js';
import { isObject } from './src/supportFunctions.js';

const fileFormat = (filepath) => path.extname(filepath);
const fileData = (filepath) => readFileSync(path.resolve(process.cwd(), filepath), { encoding: 'ascii' });

const notANull = (element) => (element === null ? 'null' : element);

const getDiffStatus = (object1, object2, key) => {
  if (_.has(object1, key) && _.has(object2, key)) {
    if ((typeof object1[key] === 'object' && typeof object2[key] === 'object') || object1[key] === object2[key]) {
      return 'identical';
    }
  }
  if (_.has(object1, key) && _.has(object2, key) && object1[key] !== object2[key]) {
    return 'changed';
  }
  if (!_.has(object1, key)) {
    return 'added';
  }
  return 'deleted';
};

const buildAst = (node1, node2) => {
  const iter = (obj1, obj2) => {
    const mergeNode = { ...obj1, ...obj2 };
    const keys = _.sortBy(Object.keys(mergeNode));

    return keys
      .map((key) => {
        const ast = {
          key,
          status: getDiffStatus(obj1, obj2, key),
          value: null,
        };

        const obj1Value = notANull(obj1[key]);
        const obj2Value = notANull(obj2[key]);

        if (ast.status === 'identical') {
          ast.value = isObject(obj1Value)
            ? iter(obj1Value, obj2Value)
            : obj1Value;
        }
        if (ast.status === 'changed') {
          ast.value = [
            isObject(obj1Value)
              ? iter(obj1Value, obj1Value)
              : obj1Value.toString(),
            isObject(obj2Value)
              ? iter(obj2Value, obj2Value)
              : obj2Value,
          ];
        }
        if (ast.status === 'added') {
          ast.value = isObject(obj2Value)
            ? iter(obj2Value, obj2Value)
            : obj2Value;
        }
        if (ast.status === 'deleted') {
          ast.value = isObject(obj1Value)
            ? iter(obj1Value, obj1Value)
            : obj1Value;
        }

        return ast;
      });
  };

  return iter(node1, node2);
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const node1 = parseFile(fileData(filepath1), fileFormat(filepath1));
  const node2 = parseFile(fileData(filepath2), fileFormat(filepath2));

  const ast = buildAst(node1, node2);

  return astFormatting(formatter, ast);
};

export default genDiff;
