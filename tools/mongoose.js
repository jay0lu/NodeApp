var mongoose = require('mongoose');
var User = require('../models/user');
var Post = require('../models/post');

mongoose.connect('mongodb://localhost/nodeapp');

// ------------------------ Create User -----------------------------
// var chris = new User({
//     name: 'Chris',
//     username: 'sevilayha',
//     password: 'password'
// });

// chris.dudify(function(err, name) {
//     if (err) throw err;
//     console.log('Your new name is ' + name);
// });

// chris.save(function(err) {
//     if (err) throw err;
//     console.log('User saved successfully!');
// });

// ------------------------ Create Post -----------------------------
// var newPost = new Post({
// 	content : 'test',
// 	creator : 'Leo',
// });

// newPost.save(function(err) {
// 	if (err) throw err;
// 	console.log('Pose saved successfully!');
// 	return;
// });

//Find all users
Post.find({}, function(err, posts) {
    if (err) throw err;
    console.log(posts);
});
