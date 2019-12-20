module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  rules: {
    camelcase: 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    semi: ['error', 'never'],
    'standard/no-callback-literal': 0,
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
  },
}
