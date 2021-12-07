import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'fs';
import parseData from './parser.js';
import formatAst from './formatters/index.js';

const getFileFormat = (filepath) => path.extname(filepath);
const getFileData = (filepath) => readFileSync(path.resolve(process.cwd(), filepath), { encoding: 'ascii' });

const notANull = (element) => (element === null ? 'null' : element);

const getDiffStatus = (object1, object2, key) => {
  if (_.has(object1, key) && _.has(object2, key)) {
    if ((_.isObject(object1[key]) && _.isObject(object2[key])) || object1[key] === object2[key]) {
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
            value: _.isObject(obj1Value)
              ? iter(obj1Value, obj2Value)
              : obj1Value,
          };
        }

        if (status === 'changed') {
          return {
            key,
            status,
            value: [
              _.isObject(obj1Value)
                ? iter(obj1Value, obj1Value)
                : obj1Value.toString(),
              _.isObject(obj2Value)
                ? iter(obj2Value, obj2Value)
                : obj2Value,
            ],
          };
        }

        if (status === 'added') {
          return {
            key,
            status,
            value: _.isObject(obj2Value)
              ? iter(obj2Value, obj2Value)
              : obj2Value,
          };
        }

        return {
          key,
          status,
          value: _.isObject(obj1Value)
            ? iter(obj1Value, obj1Value)
            : obj1Value,
        };
      });
  };

  return iter(node1, node2);
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const node1 = parseData(getFileData(filepath1), getFileFormat(filepath1));
  const node2 = parseData(getFileData(filepath2), getFileFormat(filepath2));

  const ast = buildAst(node1, node2);

  return formatAst(ast, formatter);
};

export default genDiff;
