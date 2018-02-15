'use strict';

const path     = require('path');
const passport = require('passport');

module.exports = { 
  granted(req, res){
    return res.status(200).redirect('/');
  },

  getUser(req, res){
    return res.status(200).send(req.session.passport.user);
  },

  logout(req, res){
    passport.authenticate('local', { session : false });
    req.session.destroy();
		req.logout();
		return res.status(200).send(true);
  }
};
