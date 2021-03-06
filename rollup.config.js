'use strict'
import buble from '@rollup/plugin-buble'
import {terser} from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'
import json from '@rollup/plugin-json'
import * as pkg from "./package.json"

const MIN = process.env.MIN === 'true' // true/false|unset
const FORMAT = process.env.FORMAT // umd|iife|esm

const year = (new Date).getFullYear()
const banner = `/*!
* ${pkg.name} v${pkg.version} (${pkg.homepage})
* Copyright 2019-${year} © ${pkg.author}
* Licensed under MIT (https://github.com/thednp/shorter-js/blob/master/LICENSE)
*/`
const miniBanner = `// ${pkg.name} v${pkg.version} | ${pkg.author} © ${year} | ${pkg.license}-License`

const INPUTFILE = 'src/index.js'
const OUTPUTFILE = './dist/shorter-js'+(FORMAT==='esm'?'.esm':'')+(MIN?'.min':'')+'.js'

const OUTPUT = {
  file: OUTPUTFILE,
  format: FORMAT, // or iife
}

const PLUGINS = [
  json(),
  buble(),
]

if (MIN){
  PLUGINS.push(terser({output: {preamble: miniBanner}}));
} else {
  OUTPUT.banner = banner;
  PLUGINS.push(cleanup());
}

if (FORMAT!=='esm') {
  OUTPUT.name = 'SHORTER';
}

export default [
  {
    input: INPUTFILE,
    output: OUTPUT,
    plugins: PLUGINS
  }
]
