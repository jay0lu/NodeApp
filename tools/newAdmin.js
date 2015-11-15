var mongoose = require('mongoose');
var passUtil = require('./passUtil');
var Admin = require('../models/admin');
var moment = require('moment');
mongoose.connect('mongodb://localhost/nodeapp');

// var newAdmin = new Admin({
//     username: 'admin',
//     password: 'admin',
// });

// // save the sample user
// newAdmin.save(function(err) {
//     if (err) throw err;
//     console.log('User saved successfully');
// });


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

// passUtil.validatePassword('admin', 'MHOOLVZ0AYe3f06f5e6c4c1b411f5c458fff92db98', function(err, result) {
// 	console.log(result);
// });
//console.log(passUtil.validatePassword('admin', 'MHOOLVZ0AYe3f06f5e6c4c1b411f5c458fff92db98'));
// console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
// console.log(moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'));
