import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../diff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('diff1', () => {
  const fuxture1Path = getFixturePath('file1.json');
  const fuxture2Path = getFixturePath('file2.json');

  const res = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff(fuxture1Path, fuxture2Path)).toEqual(res);
});

test('diff2', () => {
  const fuxture1Path = getFixturePath('file3.json');
  const fuxture2Path = getFixturePath('file2.json');

  const res = `{
  + host: hexlet.io
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff(fuxture1Path, fuxture2Path)).toEqual(res);
});

test('diff3', () => {
  const fuxture1Path = getFixturePath('file4.json');
  const fuxture2Path = getFixturePath('file5.json');

  const res = `{
  + dogname: Archee
  - link: vk.com/evdokimoww
  + married: true
  - name: Alex
    sex: man
  + surname: Evdokimov
}`;
  expect(genDiff(fuxture1Path, fuxture2Path)).toEqual(res);
});

test('diff4', () => {
  const fuxture1Path = getFixturePath('file3.json');
  const fuxture2Path = getFixturePath('file3.json');

  const res = `{

}`;
  expect(genDiff(fuxture1Path, fuxture2Path)).toEqual(res);
});
