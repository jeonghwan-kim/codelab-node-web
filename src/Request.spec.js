require('should');
const Request = require('./Request');

describe('Request', () => {
  it('생성 인자가 없으면 에러를 던진다', () => {
    should(() => Request()).throw()
  })

  describe('반환 객체', () => {
    let req, path, qs

    beforeEach(() => {
      path = '/api/posts'
      qs = {
        limit: '2',
        page: '1'
      }
      const encodedQs = `limit=${qs.limit}&page=${qs.page}`
      req = Request({url: `${path}?${encodedQs}`})
    })

    it('path 속성을 노출한다', () => {
      req.should.have.property('path', path)
    })

    it('query 속성을 노출한다', () => {
      req.should.have.property('query')
      req.query.limit.should.be.equal(qs.limit)
      req.query.page.should.be.equal(qs.page)
    })
  })
})