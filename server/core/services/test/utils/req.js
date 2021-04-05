const chaiHttp = require('chai-http');
const path = require('path');
const chai = require('chai');

const serverDir = path.join(process.cwd(), 'server');

chai.use(chaiHttp);
let req;

module.exports = async () => {
  if (!req) {
    const app = await require(path.join(serverDir, 'index'));

    req = chai.request.agent(app);
  }

  return req;
};
