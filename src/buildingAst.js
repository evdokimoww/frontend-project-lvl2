import _ from 'lodash';

const notANull = (element) => (element === null ? 'null' : element);

const getDiffStatus = (object1, object2, key) => {
  if (_.has(object1, key) && _.has(object2, key)) {
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return 'nested';
    }
    if (object1[key] === object2[key]) {
      return 'identical';
    }
    if (object1[key] !== object2[key]) {
      return 'changed';
    }
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

        if (status === 'nested') {
          return {
            key,
            status,
            value: iter(obj1Value, obj2Value),
          };
        }

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

export default buildAst;
