exports.plugin = {
  name: 'games-plugin',
  version: '1.0.0',
  register: (server, options) => {
    server.route(require('./games.routes'));
  }
};
