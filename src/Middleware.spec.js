require('should');
const sinon = require('sinon');
const Middleware = require('./Middleware');

describe('Middleware', () => {
  let middleware;
  beforeEach(()=> {
    middleware = Middleware();
  })

  it('초기 미들웨어 갯수는 0개이다', () => {
    middleware._middlewares.length.should.be.equal(0);
  })

  describe('add()', () => {
    it('배열에 미들웨어 함수를 추가한다', () => {
      const fns = [
        ()=>{},
        ()=>{},
        ()=>{},
      ]

      fns.forEach(fn => middleware.add(fn));

      middleware._middlewares.length.should.be.equal(fns.length)
    })
  });

  describe('run()', () => {
    it('미들웨어 함수를 실행한다', () => {
      const stub = {
        mw1() {},
        mw2() {}
      };
      sinon.stub(stub, 'mw1').callsFake((req, res, next) => next());
      sinon.stub(stub, 'mw2').callsFake((req, res, next) => next());

      const fns = [
        stub.mw1,
        stub.mw2,
      ]
      fns.forEach(fn => middleware.add(fn));

      middleware.run();

      fns.forEach(fn => {
        should(fn.called).be.equal(true)
      })
    })

    it('next를 호출하지 않는 미들웨어가 있으면 함수 체인을 즉시 중지한다', () => {
      const stub = {
        mw1() {},
        mwWillStop() {}, // next를 호출하지 않는 미들웨어
        mw2() {}
      };
      sinon.stub(stub, 'mw1').callsFake((req, res, next) => next());
      sinon.stub(stub, 'mwWillStop').callsFake(() => null);
      sinon.stub(stub, 'mw2').callsFake((req, res, next) => next());

      const fns = [
        stub.mw1,
        stub.mwWillStop,
        stub.mw2,
      ]
      fns.forEach(fn => middleware.add(fn));

      middleware.run();

      fns.forEach((fn, idx) => {
        const shouldInvoked = idx < 2
        should(fn.called).be.equal(shouldInvoked)
      });
    });

    it('에러 발생시 에러 미들웨어만 실행한다', () => {
      const stub = {
        mw1(req, res, next) {},
        mwWillThrow(req, res, next) {}, // 에러 발생 미들웨어
        mw2(req, res, next) {},
        mwWillCatchError(err, req, res, next) {} // 에러 처리 미들웨어
      };
      sinon.stub(stub, 'mw1').callsFake((req, res, next) => next());
      sinon.stub(stub, 'mwWillThrow').callsFake((req, res, next) => next(Error()));
      sinon.stub(stub, 'mw2').callsFake((req, res, next) => next());
      sinon.stub(stub, 'mwWillCatchError').callsFake((err, req, res, next) => null);

      const fns = [
        stub.mw1,
        stub.mwWillThrow,
        stub.mw2,
        stub.mwWillCatchError,
      ]
      fns.forEach(fn => middleware.add(fn));

      middleware.run();

      fns.forEach((fn, idx) => {
        const shouldInvoked = idx !== 2;
        should(fn.called).be.equal(shouldInvoked)
      });
    })
  })
});
