var Boom = require('boom');
var GameModel = require('./games.model');

function GamesController() {}

GamesController.prototype = (() => {
  /**
   * Retrieve the whole list of games in the system
   */
  const getGames = async (request, h) => {
    try {
      return await GameModel.find({}, {_id: 0, __v: 0});
    }
    catch(err) {
      global.logger.error(err);
      throw Boom.badImplementation('Cannot perform requested action');
    }
  };

  const getGamesByName = async (request, h) => {
    let gameName = request.params.name;
    try {
      return await GameModel.findOne({name: gameName}, {_id: 0, __v: 0});
    }
    catch(err) {
      global.logger.error(err);
      throw Boom.badImplementation('Cannot perform requested action');
    }
  };

  const createGame = async (request, h) => {
    let game = new GameModel({name: request.payload.name});
    try {
      return await game.save();
    }
    catch(err) {
      global.logger.error(err);
      throw Boom.conflict('The Game name might already be in use');
    }
  };

  return {
    getGames: getGames,
    getGamesByName: getGamesByName,
    createGame: createGame
  };
})();

module.exports = new GamesController();
