// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  [
    globalIgnores(['dist']),
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs.flat['recommended-latest'],
        reactRefresh.configs.vite,
      ],
      languageOptions: {
        ecmaVersion: 'latest',
        globals: globals.browser,
      },
    },
    prettierRecommended,
  ],
  storybook.configs['flat/recommended'],
);
