'use strict';

const path     = require('path');
const passport = require('passport');

module.exports = function(req, res){
  console.log(req.query);
  return res.status(200).send();
};
