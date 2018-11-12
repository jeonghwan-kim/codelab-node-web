require('should');
const Response = require('./Response');

describe('Response', () => {
  it('생성 인자가 없으면 에러를 던진다', () => {
    should(() => Response()).throw()
  })

  describe('반환 객체', () => {
    let res

    beforeEach(() => {
      res = Response({})
    })

    it('status 메소드를 노출한다', () => {
      res.should.have.property('status')
      should(typeof res.status).be.equal('function')
    })

    it('set 메소드를 노출한다', () => {
      res.should.have.property('set')
      should(typeof res.set).be.equal('function')
      should(res.set.length).be.equal(2);
    })

    it('send 메소드를 노출한다', () => {
      res.should.have.property('send')
      should(typeof res.send).be.equal('function')
    })

    it('json 메소드를 노출한다', () => {
      res.should.have.property('json')
      should(typeof res.json).be.equal('function')
    })
  })
})