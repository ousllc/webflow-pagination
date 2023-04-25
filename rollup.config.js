// rollup.config.js
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/pagination.js', // 入力ファイルのパス
  output: {
    file: 'dist/pagination.min.js',
    format: 'iife',
    name: 'webflowPagination',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    terser(),
  ]
};
