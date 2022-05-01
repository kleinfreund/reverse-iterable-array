import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

/** @type {import('rollup').RollupOptions} */ const options = {
  input: 'src/reverse-iterable-array.ts',
  output: {
    dir: 'dist',
  },
  plugins: [
    typescript(),
    terser(),
  ],
}

export default options
