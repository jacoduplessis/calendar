const svelte = require('svelte')
const fs = require('fs')
const uglify = require('uglify-js')


const prod = process.env.NODE_ENV === 'production'


const components = [
  {filename: 'Calendar.html', name: 'Calendar', dist: 'calendar.js'},
  {filename: 'Editor.html', name: 'Editor', dist: 'editor.js'},
]

components.forEach(({filename, name, dist, deps}) => {
  const source = fs.readFileSync(filename, 'utf8')
  const compiled = svelte.compile(source, {
    filename,
    name,
    format: 'iife',
    cascade: false,
    dev: !prod,
  })
  let code = ''

  code += compiled.code
  if (prod) code = uglify.minify(code).code
  fs.writeFileSync(dist, code)
})




