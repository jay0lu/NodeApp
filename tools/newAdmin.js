var mongoose = require('mongoose');
var passUtil = require('./passUtil');
var Admin = require('../models/admin');
var moment = require('moment');
var config = require('../config');
//mongoose.connect(config.mongoConn.AWS);
mongoose.connect(config.mongoConn.local);

passUtil.saltAndHash('admin', function(hash){
	console.log(hash);

	var newAdmin = new Admin({
	    username: 'admin',
	    password: hash,
	});
	// save the sample user
	newAdmin.save(function(err) {
	    if (err) throw err;
	    console.log('User saved successfully');
	});
});
