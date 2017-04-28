const fs = require('fs')
const path = require('path')
const template = require('lodash.template')

const DEFAULT_OPTIONS = {
  globalOptions: {
    actName: '',
    cacheName: '',
    scope: '',
    downgrade: false,
    assets: null
  },
  output: 'dist/',
  fileIgnorePatterns: [],
  fileGlobsPatterns: [],
  templates: {
    'manifest.json': path.join(__dirname, './tmpl/manifest.json'),
    'assets.json': path.join(__dirname, './tmpl/assets.json'),
    'sw.js': path.join(__dirname, '../dist/sw.js')
  }
}

export default class Precache {
  constructor(opts) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, opts)
  }

  apply(compiler) {
    compiler.plugin('after-emit', (compilation, callback) => {
      const done = () => callback()
      const error = err => callback(err)
      const { globalOptions } = this.options

      const assets = this.getAssets(compilation)
      const options = {
        globalOptions,
        assets: globalOptions.assets || assets
      }

      const { output } = options
      const { outputFileSystem } = compiler

      this.render(options)
        .then(files => new Promise(resolve => {
          outputFileSystem.mkdirp(path.resolve(output), resolve.bind(null, files))
        }))
        .then(files => {
          const writeFile = file => {
            const { filename, content } = file
            const dist = path.join(output, filename)
            return new Promise(resolve => {
              outputFileSystem.writeFile(dist, content, resolve)
            })
          }
          return Promise.all(files.map(writeFile))
        })
        .then(done)
        .catch(error)
    })
  }

  getAssets(compilation) {
    const { fileIgnorePatterns, fileGlobsPatterns } = this.options
    return Object.keys(compilation)
      .filter(url => !fileIgnorePatterns.some(p => p.test(url)))
      .filter(url => fileGlobsPatterns.every(p => p.test(url)))
  }

  render(options) {
    const { templates } = this.options
    const ret = Object.keys(templates)
      .reduce((mem, filename) => {
        const filepath = templates[filename]
        const raw = fs.readFileSync(filepath, 'utf-8')
        const content = template(raw)(options)

        return mem.concat({ filename, content })
      }, [])

    return Promise.resolve(ret)
  }
}
