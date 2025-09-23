import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      "@nx/enforce-module-boundaries": "off"
      // '@nx/enforce-module-boundaries': [
      //   'error',
      //   {
      //     enforceBuildableLibDependency: true,
          
      //     allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$','types/*'], //'types/*'   // 🔑 اینو اضافه کن - activate import from sw out of library       
          
      //     depConstraints: [
      //       {
      //         sourceTag: '*',
      //         onlyDependOnLibsWithTags: ['*'],
      //       },
      //     ],
      //   },
      // ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
