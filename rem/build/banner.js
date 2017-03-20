const pkg = require('../package.json')

module.exports = [
  `${pkg.name}.js v${pkg.version} ${new Date().toLocaleDateString()}`,
  `${pkg.homepage}`
].join('\n')
