const fs = require('fs')
const path = require('path')

const DEFAULT_OPTIONS = {
  cacheName: 'xxx',
  filename: '',
  filepath: '',
  scope: '',
  fileIgnorePatterns: [],
  fileGlobsPatterns: []
}

export default class Precache {
  constructor(opts) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, opts)
  }

  apply(compiler) {
    compiler.plugin('after-emit', (compilation, callback) => {
      const done = () => callback()
      const error = err => callback(err)

      const assets = this.getAssets()
    })
  }

  getAssets(compilation) {
    const { fileIgnorePatterns, fileGlobsPatterns } = this.options
    return Object.keys(compilation)
      .filter(url => !fileIgnorePatterns.some(p => p.test(url)))
      .filter(url => fileGlobsPatterns.every(p => p.test(url)))
  }

  renderTemplate() {

  }

  writeExtendFiles(compiler) {
    const { filepath } = this.workerOptions
    const tmpl = {
      'manifest.json': path.join(__dirname, './tmpl/manifest.json')
    }

    return Promise.all(
      Object.keys(tmpl).map(filename => {
        const target = tmpl[filename]
        const content = fs.readFileSync(target, 'utf8')
        const dist = path.join(filepath, '..', filename)
        return compiler.outputFileSystem.writeFile(dist, content)
      })
    )
  }
}
