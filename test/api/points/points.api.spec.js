var mongoose = require('mongoose');
var PointModel = require('../../../api/points/points.model');
const chai = require('chai');
chai.use(require('chai-http'));
const expect = chai.expect;

describe('Points API', () => {
  var points = [
    {name: 'testPoint1', game: 'game1'},
    {name: 'testPoint2', game: 'game2'},
    {name: 'testPoint3', game: 'game1'}
  ];

  before((done) => {
    PointModel.insertMany(points, done);
  });

  after(async () => {
    await mongoose.connection.db.dropCollection('points');
  });

  it('Get points', async () => {
    let resp = await chai.request('http://localhost:8095/api/')
    .get('points')
    .set(global.headers);
    expect(resp).to.have.property('body').to.be.an('array').with.lengthOf(3);
  });

  it('Get points for game', async () => {
    let resp = await chai.request('http://localhost:8095/api/')
    .get('points?game=game1')
    .set(global.headers);
    expect(resp).to.have.property('body').to.be.an('array').with.lengthOf(2);
  });

  it('Create point', async () => {
    let resp = await chai.request('http://localhost:8095/api/')
    .post('points')
    .send({name: 'newpoint', game: 'game1'})
    .set(global.headers);
    expect(resp).to.have.nested.property('body.name').to.eql('newpoint');
  });

  it('Try to create duplicate', async () => {
    let resp = await chai.request('http://localhost:8095/api/')
    .post('points')
    .send({name: 'newpoint', game: 'game1'})
    .set(global.headers);
    expect(resp).to.have.status(409);
  });
});
