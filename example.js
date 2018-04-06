const Hapi = require('hapi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/examplegameapi');
const port = 8090;
const jwtOptions = {
  algorithm: 'HS256',
  issuer: 'us',
  audience: 'all',
  expiresIn: '1d'
};
const secret = 'secret test value';

const generateToken = (payload) => jwt.sign(payload, secret, jwtOptions);

const validateToken = async (decoded, request) => ({isValid: decoded ? true: false});

const init = async () => {
  const server = new Hapi.Server({
    host: 'localhost',
    port
  });
  // include our module here ↓↓
  await server.register(require('hapi-auth-jwt2'));
 
  server.auth.strategy('token', 'jwt', {
      key: secret,
      validate: validateToken,
      verifyOptions: jwtOptions
    }
  );

  //server.auth.default('token');

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => ({env: process.env.NODE_ENV, token: generateToken({username: 'testuser'})})
  });

  await server.register(require('./index'), {
    routes: {
      prefix: '/api'
    }
  });

  await server.start();
  return server;
};

/* eslint-disable no-console */
init().then(server => {
  console.log('Server running at:', server.info.uri);
})
.catch(error => {
  console.log(error);
});


//module.exports = server;
