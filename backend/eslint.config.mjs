// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
			eqeqeq: ['error', 'always'],
			'no-useless-return': 'warn',
			'no-var': 'error',
			'no-duplicate-imports': 'warn',
			'no-self-compare': 'error',
			'no-template-curly-in-string': 'error',
			'require-atomic-updates': 'error',
			'default-case-last': 'warn',
			'func-names': ['warn', 'always'],
			'init-declarations': ['warn', 'always'],
			'no-empty-function': 'warn',
			'no-lone-blocks': 'warn',
			'no-param-reassign': 'error',
			'no-unused-expressions': 'warn'
		}
  },
);