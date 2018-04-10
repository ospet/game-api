var mongoose = require('mongoose');
var GameModel = require('../../../api/games/games.model');
const chai = require('chai');
chai.use(require('chai-http'));
const expect = chai.expect;

describe('Games API', () => {
  var games = [
    {name: 'testGame1'},
    {name: 'testGame2'},
    {name: 'testGame3'}
  ];

  before((done) => {
    GameModel.insertMany(games, done);
  });

  after(async () => {
    await mongoose.connection.db.dropCollection('games');
  });

  it('Get games', async () => {
    let resp = await chai.request('http://localhost:8095/api/')
    .get('games')
    .set(global.headers);
    expect(resp).to.have.property('body').to.be.an('array').with.lengthOf(3);
  });

  it('Create game', async () => {
    let resp = await chai.request('http://localhost:8095/api/')
    .post('games')
    .send({name: 'newgame'})
    .set(global.headers);
    expect(resp).to.have.nested.property('body.name').to.eql('newgame');
  });

  it('Try to create duplicate', async () => {
    let resp = await chai.request('http://localhost:8095/api/')
    .post('games')
    .send({name: 'newgame'})
    .set(global.headers);
    expect(resp).to.have.status(409);
  });
});
