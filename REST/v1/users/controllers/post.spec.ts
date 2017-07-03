import { appServer, db } from '../../../../';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

const url = `/api/v1/users/registration`;

beforeEach(( done ) => {
  db.connection.dropDatabase()
    .then(() => done())
    .catch(done);
});

describe('POST /users/registration', () => {

  it('should register a new user', ( done ) => {
    chai.request(appServer.getServer())
      .post(url)
      .send({
        username: 'john',
        email: 'john@gmail.com',
        password: '123456'
      })
      .end(( err, res ) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body.jwt).to.be.exist;
        expect(res.body.user).to.be.exist;
        done();
      });
  });
});
