import path from 'path';
import { readFileSync } from 'fs';
import formatAst from './src/formatters/index.js';
import buildAst from './src/buildingAst.js';
import parseData from './src/parser.js';

const getFileFormat = (filepath) => path.extname(filepath);
const getFileData = (filepath) => readFileSync(path.resolve(process.cwd(), filepath), { encoding: 'ascii' });

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const node1 = parseData(getFileData(filepath1), getFileFormat(filepath1));
  const node2 = parseData(getFileData(filepath2), getFileFormat(filepath2));

  const ast = buildAst(node1, node2);

  return formatAst(ast, formatter);
};

export default genDiff;
