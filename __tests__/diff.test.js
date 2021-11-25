import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../diff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const res = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

test('diff1json', () => {
  const fuxture1Path = getFixturePath('file1.json');
  const fuxture2Path = getFixturePath('file2.json');
  expect(genDiff(fuxture1Path, fuxture2Path)).toEqual(res);
});

test('diff1yaml', () => {
  const fuxture1Path = getFixturePath('file1.yaml');
  const fuxture2Path = getFixturePath('file2.yaml');
  expect(genDiff(fuxture1Path, fuxture2Path)).toEqual(res);
});
