const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');

const expect = chai.expect;
const apiAddress = 'http://localhost:3000';

//placeholder
describe('', function() {

  before(function() {
    server.start();
  })

  after(function() {
    server.stop();
  })

})