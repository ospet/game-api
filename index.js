// make a fake logger object
if (!global.logger) {
  console.log('defining logger');
  global.logger = {
    trace: (msg) => {console.log(`[TRACE] ${msg}`)},
    debug: (msg) => {console.log(`[DEBUG] ${msg}`)},
    info: (msg) => {console.log(`[INFO] ${msg}`)},
    warning: (msg) => {console.log(`[WARNING] ${msg}`)},
    error: (msg) => {console.log(`[ERROR] ${msg}`)}
  }
}
global.logger.debug('test');
module.exports = require('./api');
