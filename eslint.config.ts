import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import parser from '@typescript-eslint/parser';


export default defineConfig([
  // Base JavaScript configuration
  {
    ignores: [
      'node_modules/**',
      'public/**',
      '**/.vite/**',
      '**/*.d.ts',
      '**/*.map',
    ],
  },
  
  // TypeScript configuration
  ...tseslint.configs.recommended,
  
  // React configuration
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: '19.2', // Match your React version from package.json
      },
    },
    rules: {
      // React specific rules
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/prop-types': 'off', // We're using TypeScript
      'react/jsx-uses-react': 'off', // Not needed in React 17+
      'react/jsx-key': ['error', { 'checkFragmentShorthand': true }],
      'react/no-unescaped-entities': 'off',
    },
  },
  
  // Custom rules for all files
  {
    files: ['**/*.{js,ts,tsx}'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: parser,
      globals: {
        ...globals.browser,
        ...globals.es2022,
        React: 'readonly',
      },
    },
    rules: {
      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off', // Disabled in favor of TypeScript version
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      
      // Code style
      'quotes': ['warn', 'single'],
      'semi': ['warn', 'always'],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
    },
  },
  
  // Configuration for development files
  {
    files: ['**/vite.config.*', '**/eslint.config.*', '**/postcss.config.*'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]);
