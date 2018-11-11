require('should');
const sinon = require('sinon');
const Logger = require('./logger');

describe('Logger', () => {
  let logger, req, res, next;

  beforeEach(() => {
    logger = Logger();
    req = {};
    res = {};
    next = sinon.spy();
  });

  it('함수를 반환해야 한다', () => {
    should(typeof logger).be.equal('function');
  });

  it('반환된 함수는 인자를 세 개 받는다', () => {
    should(logger.length).be.equal(3);
  });

  describe('반환된 함수를 호출하면', () => {
    beforeEach(()=> {
      logger(req, res, next);
    });

    it('next 를 호출해야 한다', () => {
      should(next.called).be.equal(true);
    });
  })

})