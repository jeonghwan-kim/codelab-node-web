require('should');
const sinon = require('sinon');

const App = require('./Application');
const Middleware = require('./Middleware');

describe('Application', () => {
  let app;
  beforeEach(()=> {
    app = App()
  })
  describe('listen()', () => {
    it('server 객체의 listen 함수를 실행한다', () => {
      // arrange
      const spy = sinon.spy();
      app._server.listen = spy

      // act
      app.listen();

      // assert
      should(spy.called).be.equal(true);
    });
  });


  describe('use()', () => {
    it('Middleware 모듈 인스턴스의 add() 메소드를 실행한다', () => {
      const spy = sinon.spy();
      app._middleware.add = spy;
      const mw1 = () => null;

      app.use(mw1);

      should(spy.called).be.equal(true);
    })
  })
});