/* eslint-env mocha */
const fs = require('fs')
const Chai = require('chai')
const xlsx4conf = require('../src/index')

Chai.should()

describe('index', () => {
  it('should work', () => {
    const buffer = fs.readFileSync('test/fixtures/raw.xlsx')
    xlsx4conf(buffer)
  })
})
