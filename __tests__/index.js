const fs = require('fs')
const path = require('path')
const marked = require('../')

function files () {
  const absdir = __dirname
  const dirs = ['new', 'original'].map(testdir => path.join(absdir, testdir))

  const textfiles = dirs.map(dir => {
    return fs.readdirSync(dir)
             .filter(file => path.extname(file) === '.text')
             .map(file => {
               return { name: file, path: path.join(dir, file) }
             })
  }).reduce((a, b) => a.concat(b))

  const htmlfiles = dirs.map(dir => {
    return fs.readdirSync(dir)
             .filter(file => path.extname(file) === '.html')
             .map(file => {
               return { name: file, path: path.join(dir, file) }
             })
  }).reduce((a, b) => a.concat(b))

  return textfiles.map((_, i) => {
    return { text: textfiles[i], html: htmlfiles[i] }
  })
}

for (let file of files()) {
  const textstring = fs.readFileSync(file.text.path, 'utf8')
  const htmlstring = fs.readFileSync(file.html.path, 'utf8')

  test(`${file.text.name} converts to ${file.html.name}`, () => {
    const result = marked(textstring)
    expect(result).toBe(htmlstring)
  })
}
