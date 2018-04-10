var controller = require('./points.controller');
var Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/points',
    handler: controller.getPoints,
    config: {
      auth: 'token',
      validate: {
        query: {
          game: Joi.string().optional() // to retrieve all points for that game
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/points/{name}',
    handler: controller.getPointsByName,
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
    path: '/points',
    handler: controller.createPoint,
    config: {
      validate: {
        payload: {
          name: Joi.string().required(),
          game: Joi.string().required()
        }
      },
      auth: 'token'
    }
  }
];
