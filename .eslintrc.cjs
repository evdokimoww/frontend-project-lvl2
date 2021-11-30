module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': [2, {'allow': ['__filename', '__dirname']}],
    'import/extensions': ['error', 'always', {ignorePackages: true}],
  },
  plugins: ['jest'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  }
};
