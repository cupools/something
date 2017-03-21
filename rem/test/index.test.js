/* eslint-env mocha */
import Chai from 'chai'
import rem from '../src/index'

Chai.should()

describe('rem', () => {
  const documentElement = document.documentElement
  const assert = (val, done) => {
    setTimeout(() => {
      documentElement.style.fontSize.should.equal(val)
      done()
    }, 400)
  }


  it('should work', (done) => {
    rem(640, 10)
    assert('10px', done)
  })

  it('should work with innerHeight', (done) => {
    rem(1136, 100, true)
    assert('100px', done)
  })
})
