import { appServer } from '../../../../';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { config } from '../../../../config';

const expect = chai.expect;
chai.use(chaiHttp);

const url = `${config.server.apiPath}/users/12`;

describe('GET /users', () => {

  it('should return an array of users', ( done ) => {
    chai.request(appServer.getServer())
      .get(url)
      .end(( err, res ) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.exist;
        done();
      });
  });
});
