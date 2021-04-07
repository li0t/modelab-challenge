const cors = require('../cors');
const errors = require('../errors');

const { expect } = require('chai');

describe('SERVER CONFIGS', () => {
  describe('CORS', () => {
    it('should return a success callback', async () => {
      cors.origin(null, (error, passed) => {
        expect(error).to.be.null;
        expect(passed).be.true;
      });
    });

    it('should return an error callback', async () => {
      cors.origin('strange-origin', (error, passed) => {
        expect(error).to.be.an('error');
        expect(passed).be.undefined;
      });
    });
  });

  describe('ERRORS', () => {
    it('should return a shouldDebug function', async () => {
      expect(errors.shouldDebug).to.be.a('function');
      expect(errors.shouldDebug({ code: 399})).to.be.false;
      expect(errors.shouldDebug({ code: 400})).to.be.true;
    });
  });
});
