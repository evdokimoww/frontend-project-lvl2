import _ from 'lodash';

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

        const value1 = obj1[key];
        const value2 = obj2[key];

        if (status === 'nested') {
          return {
            key,
            status,
            value: iter(value1, value2),
          };
        }

        if (status === 'identical') {
          return {
            key,
            status,
            value: _.isObject(value1)
              ? iter(value1, value2)
              : value1,
          };
        }

        if (status === 'changed') {
          return {
            key,
            status,
            value: [
              _.isObject(value1)
                ? iter(value1, value1)
                : value1,
              _.isObject(value2)
                ? iter(value2, value2)
                : value2,
            ],
          };
        }

        if (status === 'added') {
          return {
            key,
            status,
            value: _.isObject(value2)
              ? iter(value2, value2)
              : value2,
          };
        }

        return {
          key,
          status,
          value: _.isObject(value1)
            ? iter(value1, value1)
            : value1,
        };
      });
  };

  return iter(node1, node2);
};

export default buildAst;
