module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,

  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-return-await': 'off',
    'global-require ': 'off',
  },
};
