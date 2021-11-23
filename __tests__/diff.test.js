import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../diff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('diff1json', () => {
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

test('diff2json', () => {
  const fuxture1Path = getFixturePath('file3.json');
  const fuxture2Path = getFixturePath('file2.json');

  const res = `{
  + host: hexlet.io
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff(fuxture1Path, fuxture2Path)).toEqual(res);
});

test('diff3json', () => {
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

test('diff4json', () => {
  const fuxture1Path = getFixturePath('file3.json');
  const fuxture2Path = getFixturePath('file3.json');

  const res = `{

}`;
  expect(genDiff(fuxture1Path, fuxture2Path)).toEqual(res);
});

test('diff1yaml', () => {
  const fuxture1Path = getFixturePath('file1.yaml');
  const fuxture2Path = getFixturePath('file2.yaml');

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

test('diff2yaml', () => {
  const fuxture1Path = getFixturePath('file3.yaml');
  const fuxture2Path = getFixturePath('file2.yaml');

  const res = `{
  + host: hexlet.io
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff(fuxture1Path, fuxture2Path)).toEqual(res);
});

test('diff3yaml', () => {
  const fuxture1Path = getFixturePath('file4.yaml');
  const fuxture2Path = getFixturePath('file5.yaml');

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

test('diff4yaml', () => {
  const fuxture1Path = getFixturePath('file3.yaml');
  const fuxture2Path = getFixturePath('file3.yaml');

  const res = `{

}`;
  expect(genDiff(fuxture1Path, fuxture2Path)).toEqual(res);
});
