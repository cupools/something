/* eslint-env mocha */
import Chai from 'chai'
import Conf from '../src/index'

Chai.should()

describe('index', () => {
  it('should work', () => {
    let mockOS = null
    let mockPF = null

    const os = () => mockOS
    const pf = () => mockPF
    const raw = {
      rule: '#root',
      value: null,
      childrens: [{
        rule: '#os.iOS',
        value: 'os=ios',
        childrens: [{
          rule: '#pf.UCBrowser',
          value: 'os=ios&pf=ucbrowser',
          childrens: null
        }, {
          rule: '#pf.WeChat',
          value: 'os=ios&pf=wechat',
          childrens: null
        }]
      }, {
        rule: '#os.Android',
        value: 'os=android'
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
    conf.match(raw).should.be.equal(null)
  })
})
