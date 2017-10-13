const svelte = require('svelte');
const fs = require('fs')
const uglify = require('uglify-js')

const source = fs.readFileSync('Calendar.html', 'utf8')

const compiled = svelte.compile(source, {
  format: 'iife',
  filename: 'Calendar.html',
  name: 'Calendar',
  cascade: false,
});

const min = uglify.minify(compiled.code)

fs.writeFileSync('calendar.js', min.code)