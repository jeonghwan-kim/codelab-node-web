require('should');
const sinon = require('sinon');
const debug = require('./debug');

describe('debug', () => {
  describe('생성', () => {
    it('태그명을 인자로 받는다 (없으면 예외를 던진다)', () => {
      should(() => debug()).throw();
    });

    it('함수를 반환한다', () => {
      const debug = require('./debug')('mytag');
      should(typeof debug).be.equal('function');
    });
  })

  describe('반환된 함수', () => {
    let debug, tag, msg, result;

    beforeEach(() => {
      tag = 'mytag';
      debug = require('./debug')(tag);
      msg = 'my log message';
      result = debug(msg);
    });

    it('반환된 문자열은 tag를 포함한다', () => {
      result.includes(tag).should.be.true;
    });

    it('반환된 문자열은 msg를 포함한다', () => {
      result.includes(msg).should.be.true;
    });

    it('로그 문자열을 인자로 console.log 함수를 실행한다', () => {
      sinon.spy(console, 'log');
      const expected = `${tag} ${msg}`;

      debug(msg);

      sinon.assert.called(console.log);
    });
  });
});