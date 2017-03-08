/* eslint-env mocha */
import Chai, { expect } from 'chai'
import Conf from '../src/index'

const should = Chai.should()

describe('index', () => {
  it('should work', () => {
    let mockOS = null
    let mockPF = null

    const os = () => mockOS
    const pf = () => mockPF
    const raw = {
      rule: 'root',
      value: null,
      children: [{
        rule: 'os',
        expected: 'iOS',
        value: 'os=ios',
        children: [{
          rule: 'pf',
          expected: 'UCBrowser',
          value: 'os=ios&pf=ucbrowser',
          children: null
        }, {
          rule: 'pf',
          expected: 'WeChat',
          value: 'os=ios&pf=wechat',
          children: null
        }]
      }, {
        rule: 'os',
        expected: 'Android',
        value: 'os=android',
        children: null
      }]
    }
    const conf = new Conf({ os, pf })

    mockOS = 'iOS'
    mockPF = 'UCBrowser'
    conf.match(raw).should.be.equal('os=ios&pf=ucbrowser')

    mockOS = 'iOS'
    mockPF = 'WeChat'
    conf.match(raw).should.be.equal('os=ios&pf=wechat')

    mockOS = 'iOS'
    mockPF = 'Others'
    conf.match(raw).should.be.equal('os=ios')

    mockOS = 'Android'
    mockPF = 'UCBrowser'
    conf.match(raw).should.be.equal('os=android')

    mockOS = 'Others'
    mockPF = 'UCBrowser'
    should.equal(conf.match(raw), null)
  })
})
