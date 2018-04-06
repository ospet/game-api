var controller = require('./games.controller');
var Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/games',
    handler: controller.getGames,
    config: {
      auth: 'token'
    }
  },
  {
    method: 'GET',
    path: '/games/{name}',
    handler: controller.getGamesByName,
    config: {
      validate: {
        params: {
          name: Joi.string().required()
        }
      },
      auth: 'token'
    }
  },
  {
    method: 'POST',
    path: '/games',
    handler: controller.createGame,
    config: {
      validate: {
        payload: {
          name: Joi.string().required()
        }
      },
      auth: 'token'
    }
  }
];
