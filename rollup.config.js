import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import commonjs from "rollup-plugin-commonjs";
import resolve from 'rollup-plugin-node-resolve';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import serve from 'rollup-plugin-serve';

import pkg from "./package.json";

export default {
  input: 'src/index.ts',
  output: {
    file: pkg.main,
    format: 'umd',
    name: 'EggTap',
    sourcemap: true,
    globals: {
      'pixi.js': 'PIXI'
    },
  },
  external: [
    'pixi.js',
    'pixi-sound',
    'pixi-layers',
    '@pixi/graphics-extras',
    'gsap'
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    url({
      include: ['**/*.mp3', '**/*.wav']
    }),
    commonjs({
      include: ["node_modules/**"],
      namedExports: {}
    }),
    typescript(),
    htmlTemplate({
      template: 'template.html',
      target: 'build/index.html',
    }),
    process.env.BUILD === 'production' ? null : serve('build')
  ],
  watch: {
    chokidar: true,
    // include and exclude govern which files to watch. by
    // default, all dependencies will be watched
    exclude: ['node_modules/**']
  }
};