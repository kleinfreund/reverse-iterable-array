import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/reverse-iterable-array.ts',
    output: {
      format: 'umd',
      name: 'ReverseIterableArray',
      exports: 'named',
      file: 'dist/reverse-iterable-array.js',
    },
    plugins: [
      typescript(),
      terser(),
    ],
  },
]
