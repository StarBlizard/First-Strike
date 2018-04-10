'use strict';

const path     = require('path');

module.exports = function(req, res){
  console.log(req.body);
  return res.status(200).send(req.body);
};
