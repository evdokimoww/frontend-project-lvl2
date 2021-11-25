import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'fs';
// eslint-disable-next-line import/extensions
import parseFile from './parser.js';
// eslint-disable-next-line import/extensions
import stylish from './formatter.js';

const fileFormat = (filepath) => path.extname(filepath);
const fileData = (filepath) => readFileSync(path.resolve(process.cwd(), filepath), { encoding: 'ascii' });

const isObject = (element) => typeof element === 'object';
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
  const iter = (obj1, obj2, result, deepLevel) => {
    const mergeNode = { ...obj1, ...obj2 };
    const keys = Object.keys(mergeNode).sort();

    return keys
      .map((key) => {
        const ast = {
          key,
        };

        const diffStatus = getDiffStatus(obj1, obj2, key);
        ast.status = diffStatus;
        ast.level = deepLevel;

        const obj1Value = notANull(obj1[key]);
        const obj2Value = notANull(obj2[key]);

        if (diffStatus === 'identical') {
          ast.value = isObject(obj1Value)
            ? iter(obj1Value, obj2Value, [], (deepLevel + 1))
            : obj1Value;
        }
        if (diffStatus === 'changed') {
          ast.value = [
            isObject(obj1Value)
              ? iter(obj1Value, obj1Value, [], (deepLevel + 1))
              : obj1Value.toString(),
            isObject(obj2Value)
              ? iter(obj2Value, obj2Value, [], (deepLevel + 1))
              : obj2Value,
          ];
          ast.level = deepLevel;
        }
        if (diffStatus === 'added') {
          ast.value = isObject(obj2Value)
            ? iter(obj2Value, obj2Value, [], (deepLevel + 1))
            : obj2Value;
        }
        if (diffStatus === 'deleted') {
          ast.value = isObject(obj1Value)
            ? iter(obj1Value, obj1Value, [], (deepLevel + 1))
            : obj1Value;
        }

        return ast;
      });
  };

  return iter(node1, node2, [], 0);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const node1 = parseFile(fileData(filepath1), fileFormat(filepath1));
  const node2 = parseFile(fileData(filepath2), fileFormat(filepath2));

  const ast = buildAst(node1, node2);

  let formattedAst;
  if (format === 'stylish') {
    formattedAst = stylish(ast);
  }

  return formattedAst;
};

export default genDiff;
