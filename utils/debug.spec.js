require('should');
const sinon = require('sinon');
const debug = require('./debug');

describe('debug', () => {
  describe('생성', () => {
    it('태그명을 인자로 받는다 (없으면 예외를 던진다)', () => {
      should(() => debug()).throw();
    })

    it('함수를 반환한다', () => {
      const debug = require('./debug')('mytag');
      should(typeof debug).be.equal('function');
    })
  })

  describe('반환된 함수', () => {
    let debug, tag, msg;

    beforeEach(() => {
      tag = 'mytag';
      debug = require('./debug')(tag);
      msg = 'my log message';
    })

    it('tag + message 형식의 로그 문자열을 반환한다', () => {
      const expected = `${tag} ${msg}`;

      const actual = debug(msg);

      actual.should.be.equal(expected);
    })

    it('로그 문자열을 인자로 console.log 함수를 실행한다', () => {
      sinon.spy(console, 'log');
      const expected = `${tag} ${msg}`;

      debug(msg);

      sinon.assert.calledWith(console.log, expected);
    })
  })

  describe('메세지 출력함수', () => {
    it('_log() 함수 결과문자열을 console.log()함수의 인자로 전달하여 실행한다', () => {

    })
  })
})