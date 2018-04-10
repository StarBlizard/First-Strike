'use strict';

const nconf = require('nconf');
const knex  = require('knex');

module.exports = {

	start(){
		let connection = knex(nconf.get('database'));
		this.db = require('bookshelf')(connection);

		console.log("DATABASE CONNECTION started");
	}

};
