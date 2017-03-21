/* eslint-env mocha */
import Chai from 'chai'
import rem from '../src/index'

Chai.should()

describe('rem', () => {
  const documentElement = document.documentElement

  it('should work', (done) => {
    rem(640, 10)
    setTimeout(() => {
      documentElement.style.fontSize.should.equal('10px')
      done()
    }, 400)
  })

  it('should work with innerHeight', (done) => {
    rem(1136, 10, true)
    setTimeout(() => {
      documentElement.style.fontSize.should.equal('10px')
      done()
    }, 400)
  })
})
