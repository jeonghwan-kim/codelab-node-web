require('should')
const server = require('./server')

describe('server test suite', () => {
  it('should return "hello world"', () => {
    server().should.be.equal('Hello world')
  })
})