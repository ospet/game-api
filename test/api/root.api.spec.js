const Hapi = require('hapi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const port = 8095;
const jwtOptions = {
  algorithm: 'HS256',
  issuer: 'us',
  audience: 'all',
  expiresIn: '1d'
};
const secret = 'secret test value';

const generateToken = (payload) => jwt.sign(payload, secret, jwtOptions);

const validateToken = async (decoded, request) => ({isValid: decoded ? true: false});

global.token = generateToken({username: 'testuser'});
global.headers = {
  'Content-Type': 'application/json',
  'authorization': global.token
};

const init = async () => {
  await mongoose.connect('mongodb://localhost/examplegameapi_at');
  global.server = new Hapi.Server({
    host: 'localhost',
    port
  });
  await global.server.register(require('hapi-auth-jwt2'));
 
  global.server.auth.strategy('token', 'jwt', {
      key: secret,
      validate: validateToken,
      verifyOptions: jwtOptions
    }
  );

  await global.server.register(require('../../index'), {
    routes: {
      prefix: '/api'
    }
  });
  
  await global.server.start();
};

before(async () => {
  await init();
});

after(async () => {
  await global.server.stop();
  await mongoose.disconnect();
})
