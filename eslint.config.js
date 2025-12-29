// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'dist/**',
      'web-build/**',
      '*.config.js',
      '*.config.ts',
      'babel.config.js',
      'metro.config.js',
      'jest.config.js',
      'coverage/**',
      '.next/**',
      '.vscode/**',
      '.husky/**',
      '.history/**',
      'tsconfig.json',
      'eslint.config.mts',
      'expo-env.d.ts',
    ],
  },
]);
