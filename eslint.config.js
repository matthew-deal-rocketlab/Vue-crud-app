import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    files: ['**/*.{ts,mts,tsx,vue}'],
    extends: [
      'plugin:vue/vue3-essential',
      '@vue/typescript/recommended',
      'prettier',
    ],
    rules: {
      'no-unused-vars': 'off', // Disable base rule
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  skipFormatting,
]
