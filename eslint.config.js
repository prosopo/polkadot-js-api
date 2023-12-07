// Copyright 2017-2023 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0

import unusedImports from 'eslint-plugin-unused-imports';

import baseConfig from '@polkadot/dev/config/eslint';

export default [
  {
    ignores: [
      // see the tsconfig.eslint.json for explanation
      'packages/api-augment/src/kusama/*.ts',
      'packages/api-augment/src/polkadot/*.ts'
    ]
  },
  ...baseConfig,
  {
    plugins: {
      ...baseConfig[2].plugins,
      'unused-imports': unusedImports
    },
    rules: {
      // add override for any (a metric ton of them, initial conversion)
      '@typescript-eslint/no-explicit-any': 'off',
      // we generally use this in isFunction, not via calling
      '@typescript-eslint/unbound-method': 'off',
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { args: 'after-used', argsIgnorePattern: '^_', vars: 'all', varsIgnorePattern: '^_' }
      ]
    }
  }
];
