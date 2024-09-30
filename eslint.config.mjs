import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import typescriptParser from '@typescript-eslint/parser'
import pluginTypescript from '@typescript-eslint/eslint-plugin'

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    ignores: ['**/__tests__/**/*'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2018,
      sourceType: 'module',
      parser: typescriptParser,
    },
    plugins: {
      react: pluginReact,
      '@typescript-eslint': pluginTypescript,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'prettier/prettier': 0,
      quotes: ['error', 'single'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
      'object-curly-spacing': ['error', 'always'],
      'one-var': 'off',
      'no-multi-assign': 'off',
      'no-nested-ternary': 'off',
      'no-undef': 'off',
      'global-require': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-first-prop-new-line': 'error',
      'react/jsx-max-props-per-line': 'error',
      'react/jsx-closing-bracket-location': 'error',
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line',
        },
      ],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      semi: ['error', 'never'],

      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  // React flat config
  pluginReact.configs.flat.recommended,
]
