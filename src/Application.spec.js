require('should');
const sinon = require('sinon');

const App = require('./Application');

describe('Application', () => {
  describe('listen()', () => {
    it('server 객체의 listen 함수를 실행한다', () => {
      // arrange
      const app = App();
      const spy = sinon.spy();
      app._server.listen = spy

      // act
      app.listen();

      // assert
      should(spy.called).be.equal(true);
    });
  });
});