import { appServer } from '../../../../';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

const url = `/api/v1/users`;

describe('GET /users', () => {

  it('should return an array of users', ( done ) => {
    chai.request(appServer.getServer())
      .get(url)
      .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NTkzYmRjOTkyNGQ5NDY0MjYwODdiNSIsImlhdCI6MTQ5OTAyMDI2MSwiZXhwIjoyMTAzODIwMjYxfQ.wqJuvU9qMpDOISdaz3688XTokIwHgIUEQAt6uWiGvZo')
      .end(( err, res ) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.exist;
        console.log(res.body);
        done();
      });
  });
});
