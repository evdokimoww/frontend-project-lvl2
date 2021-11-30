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
        const status = getDiffStatus(obj1, obj2, key);

        const obj1Value = notANull(obj1[key]);
        const obj2Value = notANull(obj2[key]);

        if (status === 'identical') {
          return {
            key,
            status,
            value: isObject(obj1Value)
              ? iter(obj1Value, obj2Value)
              : obj1Value,
          };
        }

        if (status === 'changed') {
          return {
            key,
            status,
            value: [
              isObject(obj1Value)
                ? iter(obj1Value, obj1Value)
                : obj1Value.toString(),
              isObject(obj2Value)
                ? iter(obj2Value, obj2Value)
                : obj2Value,
            ],
          };
        }

        if (status === 'added') {
          return {
            key,
            status,
            value: isObject(obj2Value)
              ? iter(obj2Value, obj2Value)
              : obj2Value,
          };
        }

        return {
          key,
          status,
          value: isObject(obj1Value)
            ? iter(obj1Value, obj1Value)
            : obj1Value,
        };
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
