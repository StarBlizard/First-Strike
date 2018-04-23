'use strict';

const path = require('path');

function isEmptyJSON(obj){
	for(var i in obj){return false;}
  return true;
};

module.exports = { 
	
	index(req, res){
    console.log(req.session.passport, "pepe");
		return (isEmptyJSON(req.session.passport)) ? res.sendFile(path.join(__dirname, '../public', 'index.html')) : res.redirect('/home');
	},

  home(req, res){
		res.sendFile(path.join(__dirname, '../public', 'index.html'));
  }

};
