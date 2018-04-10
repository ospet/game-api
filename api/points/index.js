exports.plugin = {
  name: 'points-plugin',
  version: '1.0.0',
  register: (server, options) => {
    server.route(require('./points.routes'));
  }
};
