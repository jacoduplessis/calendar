const rollup = require('rollup')
const uglify = require('rollup-plugin-uglify')
const svelte = require('rollup-plugin-svelte')
const buble = require('rollup-plugin-buble')

const prod = process.env.NODE_ENV === 'production';

rollup.rollup({
  input: './src/Calendar.html',
  plugins: [
    svelte({
      css: css => css.write('./dist/calendar.css'),
			cascade: false
    }),
    prod && buble({ exclude: 'node_modules/**' }),
    prod && uglify()
  ]
}).then(bundle => {
  bundle.write({
    format: 'iife',
    name: 'Calendar',    
    file: './dist/calendar.js'
  })
})

rollup.rollup({
  input: './src/Editor.html',
  plugins: [
    svelte({
      css: css => css.write('./dist/editor.css'),
			cascade: false
    }),
    prod && buble({ exclude: 'node_modules/**' }),    
    prod && uglify()
  ]
}).then(bundle => {
  bundle.write({
    format: 'iife',
    name: 'Editor',    
    file: './dist/editor.js'
  })
})