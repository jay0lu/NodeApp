var mongoose = require('mongoose');
var Admin = require('../models/admin');
mongoose.connect('mongodb://localhost/nodeapp');

var newAdmin = new Admin({
    username: 'admin',
    password: 'admin',
});

// save the sample user
newAdmin.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
});
