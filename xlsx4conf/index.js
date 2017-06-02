const xlsx2json = require('./lib/index')

module.exports = raw => `module.exports = ${JSON.stringify(xlsx2json(raw))}`
