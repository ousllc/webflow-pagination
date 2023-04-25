// rollup.config.js
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/pagination.js', // 入力ファイルのパス
  output: {
    file: 'dist/pagination.min.js', // 出力ファイルのパス
    format: 'umd', // モジュール形式（適宜変更可能）
    name: 'Pagination' // ライブラリ名（適宜変更可能）
  },
  plugins: [terser()] // terserプラグインを適用
};
