module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['dist', '.eslintrc.*'],
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/typescript',
  ],
  plugins: [
    'react',
    'simple-import-sort',
    'prettier',
    'jsx-a11y',
    'eslint-plugin-import',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^\\u0000'], // side effect (E.g."import "normalize.css"")
          ['^react$'],
          ['^[^.]'], // Libs
          ['^../|^~/|^./'],
        ],
      },
    ],
    'import/no-cycle': 'error',
  },
  overrides: [
    // Typescript related rules
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },

      rules: {
        // We should absolutely avoid using ts-ignore, but it"s not always possible.
        // particular when a dependencies types are incorrect.
        '@typescript-eslint/ban-ts-comment': [
          'warn',
          { 'ts-ignore': 'allow-with-description' },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },

    // Specials rules for testing
    {
      extends: ['plugin:vitest/recommended'],
      files: ['**/*.test.ts'],
      plugins: ['vitest'],
      rules: {
        // you should turn the original rule off *only* for test files
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],
}
