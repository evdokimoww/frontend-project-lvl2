module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    "no-underscore-dangle": [2, { "allow": ["__filename", "__dirname"] }],
    "import/extensions": ['error', 'always', {ignorePackages: true} ],
  },
  plugins: ["jest"],
};
