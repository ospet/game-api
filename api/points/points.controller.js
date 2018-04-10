var Boom = require('boom');
var PointModel = require('./points.model');

function PointsController() {}

PointsController.prototype = (() => {
  /**
   * Retrieve the whole list of points in the system
   */
  const getPoints = async (request, h) => {
    try {
      let filters = request.query;
      return await PointModel.find(filters, {_id: 0, __v: 0});
    }
    catch(err) {
      global.logger.error(err);
      throw Boom.badImplementation('Cannot perform requested action');
    }
  };

  const getPointsByName = async (request, h) => {
    let pointName = request.params.name;
    try {
      return await PointModel.findOne({name: pointName}, {_id: 0, __v: 0});
    }
    catch(err) {
      global.logger.error(err);
      throw Boom.badImplementation('Cannot perform requested action');
    }
  };

  const createPoint = async (request, h) => {
    let point = new PointModel(request.payload);
    try {
      return await point.save();
    }
    catch(err) {
      global.logger.error(err);
      throw Boom.conflict('The Point name might already be in use');
    }
  };

  return {
    getPoints: getPoints,
    getPointsByName: getPointsByName,
    createPoint: createPoint
  };
})();

module.exports = new PointsController();
