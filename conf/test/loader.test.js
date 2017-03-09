/* eslint-env mocha */

import Chai from 'chai'
import loader from '../src/loader'

describe('loader', () => {
  it('should work', () => {
    loader`
      - os iOS: os=ios
        - pf UCBrowser: os=ios&pf=ucbrowser
        - pf WeChat: os=ios&pf=wechat
      - os Android: os=android
    `.should.eql({
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
    })
  })
})
