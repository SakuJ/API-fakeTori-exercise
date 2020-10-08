const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');

const expect = chai.expect;
const apiAddress = 'http://localhost:3000';

describe('Fake tori.fi operations', function() {

  before(function() {
    server.start();
  })

  after(function() {
    server.stop();
  })

  describe('create a new user', () => {
    it('should create a new user', async () => {
      await
      chai
        .request(apiAddress)
        .post('/user')
        .send({
          username: 'Janne123',
          email: 'email@test.com',
          phoneNumber: '0450450450',
          password: 'password123',
          name: 'Janne',
          address: {
            street: 'Isokatu',
            postalCode: 90100,
            city: 'Oulu'
          }
        })
        .then(response => {
          expect(response.status).to.equal(200);
          return chai.request(apiAddress).get('/user');
        })
        .then(readResponse => {
          expect(readResponse.body.user[readResponse.body.user.length - 1].username).to.equal('Janne123')
          expect(readResponse.body.user[readResponse.body.user.length - 1].email).to.equal('email@test.com')
          expect(readResponse.body.user[readResponse.body.user.length - 1].phoneNumber).to.equal('0450450450')
          expect(readResponse.body.user[readResponse.body.user.length - 1].name).to.equal('Janne')
          expect(readResponse.body.user[readResponse.body.user.length - 1].address).to.deep.equal({
            street: "Isokatu",
            postalCode: 90100,
            city: "Oulu"
          });
        })
    })
  })

  describe('logging in', () => {
    it('should response "Wrong username" and not log in if the username is inconnect', async () => {
      await
      chai
        .request(apiAddress)
        .post('/login')
        .send({
          username: "usernamewrong",
          password: "password123"
        })
        .then(response => {
          expect(response.status).to.equal(200);
          expect(response.text).to.equal('Wrong username');
          return chai.request(apiAddress).get('/logged')
        })
        .then(readResponse => {
          expect(readResponse.body.islogged).to.be.a('null');
        });
    })

    it('should response "Wrong password" and not log in if the password is inconnect', async () => {
      await
      chai
        .request(apiAddress)
        .post('/login')
        .send({
          username: "username",
          password: "password"
        })
        .then(response => {
          expect(response.status).to.equal(200);
          expect(response.text).to.equal('Wrong password');
          return chai.request(apiAddress).get('/logged')
        })
        .then(readResponse => {
          expect(readResponse.body.islogged).to.be.a('null');
        });
    })

    it('should log in if the username and password are correct', async () => {
      await
      chai
        .request(apiAddress)
        .post('/login')
        .send({
          username: "username",
          password: "password123"
        })
        .then(response => {
          expect(response.status).to.equal(200);
          return chai.request(apiAddress).get('/logged');
        })
        .then(readResponse => {
          expect(readResponse.body.islogged.username).to.equal('username')
          expect(readResponse.body.islogged.password).to.equal('$2b$10$DjN/cAf2kTQPb3im4YlMQOVvw9g5vgOSwsv1zVq0CxARZ9xuNHDti')
        })
        .catch(err => {
          expect.fail(err);
        })
    })
  })
})