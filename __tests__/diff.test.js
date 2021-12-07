import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../diff.js';
import { getJsonResult, getPlainResult, getStylishResult } from '../__fixtures__/results.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('diffStylishJson', () => {
  const fuxture1Path = getFixturePath('file1.json');
  const fuxture2Path = getFixturePath('file2.json');
  expect(genDiff(fuxture1Path, fuxture2Path)).toEqual(getStylishResult());
});

test('diffStylishYaml', () => {
  const fuxture1Path = getFixturePath('file1.yaml');
  const fuxture2Path = getFixturePath('file2.yaml');
  expect(genDiff(fuxture1Path, fuxture2Path)).toEqual(getStylishResult());
});

test('diffPlainJson', () => {
  const fuxture1Path = getFixturePath('file1.json');
  const fuxture2Path = getFixturePath('file2.json');
  expect(genDiff(fuxture1Path, fuxture2Path, 'plain')).toEqual(getPlainResult());
});

test('diffPlainYaml', () => {
  const fuxture1Path = getFixturePath('file1.yaml');
  const fuxture2Path = getFixturePath('file2.yaml');
  expect(genDiff(fuxture1Path, fuxture2Path, 'plain')).toEqual(getPlainResult());
});

test('diffJsonJson', () => {
  const fuxture1Path = getFixturePath('file1.json');
  const fuxture2Path = getFixturePath('file2.json');
  expect(genDiff(fuxture1Path, fuxture2Path, 'json')).toEqual(getJsonResult());
});

test('diffJsonYaml', () => {
  const fuxture1Path = getFixturePath('file1.yaml');
  const fuxture2Path = getFixturePath('file2.yaml');
  expect(genDiff(fuxture1Path, fuxture2Path, 'json')).toEqual(getJsonResult());
});
