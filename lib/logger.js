/*
 * Logger is our custom logger,
 * basically, a console.log
 * with cute colorrs
 */

const Logger = {};

Logger.step = function(title){
  console.log(`STEP|${title}`);
};

Logger.info = function(message){
  console.log(`INFO|${message}`);
};

Logger.warn = function(message){
  console.log(`WARN|${message}`);
};

Logger.error = function(message){
  console.log(`ERROR|${message}`);
};

module.exports = Logger;
