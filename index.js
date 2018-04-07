// make a fake logger object
if (!global.logger) {
  global.logger = {
    trace: (msg) => {console.log(`[TRACE] ${msg}`)},
    debug: (msg) => {console.log(`[DEBUG] ${msg}`)},
    info: (msg) => {console.log(`[INFO] ${msg}`)},
    warning: (msg) => {console.log(`[WARNING] ${msg}`)},
    error: (msg) => {console.log(`[ERROR] ${msg}`)}
  }
}
module.exports = require('./api');
