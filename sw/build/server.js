const path = require('path')
const express = require('express')
const open = require('open')
const serveStatic = require('serve-static')

const app = express()

app.use(serveStatic(path.resolve('dist')))
app.listen(5000, e => {
  if (e) throw e
  open('http://localhost:5000/')
})
