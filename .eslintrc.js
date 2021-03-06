module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'plugin:vue/recommended', 'eslint:recommended', '@vue/airbnb'],
  rules: {
    'linebreak-style': [0, 'error', 'windows'],
    'global-require': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never'
      },
    ],
    'arrow-parens': ['error', 'always'],
    'func-names': ['error', 'never'],
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'new-cap': 'off',
    'no-const-assign': 'off',
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    "no-restricted-syntax": 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  settings: {
    'import/resolver': {
      webpack: {
        "config": "node_modules/@vue/cli-service/webpack.config.js"
      },
    },
  },
};
