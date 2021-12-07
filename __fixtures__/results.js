const getStylishResult = () => `{
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

const getPlainResult = () => `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const getJsonResult = () => '[{"key":"common","status":"sameNameObjects","value":[{"key":"follow","status":"added","value":false},{"key":"setting1","status":"identical","value":"Value 1"},{"key":"setting2","status":"deleted","value":200},{"key":"setting3","status":"changed","value":["true","null"]},{"key":"setting4","status":"added","value":"blah blah"},{"key":"setting5","status":"added","value":[{"key":"key5","status":"identical","value":"value5"}]},{"key":"setting6","status":"sameNameObjects","value":[{"key":"doge","status":"sameNameObjects","value":[{"key":"wow","status":"changed","value":["","so much"]}]},{"key":"key","status":"identical","value":"value"},{"key":"ops","status":"added","value":"vops"}]}]},{"key":"group1","status":"sameNameObjects","value":[{"key":"baz","status":"changed","value":["bas","bars"]},{"key":"foo","status":"identical","value":"bar"},{"key":"nest","status":"changed","value":[[{"key":"key","status":"identical","value":"value"}],"str"]}]},{"key":"group2","status":"deleted","value":[{"key":"abc","status":"identical","value":12345},{"key":"deep","status":"sameNameObjects","value":[{"key":"id","status":"identical","value":45}]}]},{"key":"group3","status":"added","value":[{"key":"deep","status":"sameNameObjects","value":[{"key":"id","status":"sameNameObjects","value":[{"key":"number","status":"identical","value":45}]}]},{"key":"fee","status":"identical","value":100500}]}]';

export {
  getStylishResult,
  getPlainResult,
  getJsonResult,
};
