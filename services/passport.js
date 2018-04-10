'use strict';

module.exports = {

  start(){
    this.passport = require('passport');
    this.passport.use(require('../strategies/local')());
    this.passport.use(require('../strategies/twitter')());
    this.passport.serializeUser(this.serialize);
    this.passport.deserializeUser(this.deserialize);
  },

  serialize(model, done){
    return done(null, model);
  },

  deserialize(user, done){
    return done(null, user);
  }

};
