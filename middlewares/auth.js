'use strict';

function isEmptyJSON(obj){
	for(var i in obj){return false;}
  return true;
};

module.exports = {
  loggedIn(req, res, next){
    return (isEmptyJSON(req.session.passport)) ? res.status(401).send('unlogged') : next();
  }
};
