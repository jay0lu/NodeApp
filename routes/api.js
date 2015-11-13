var express = require('express');
var mongoose = require('mongoose');
var Post = require('../models/post');
var router = express.Router();
var _ = require('underscore');
mongoose.connect('mongodb://localhost/nodeapp');

router.route('/')
	.get(function(req, res) {
		// var accpectableParams = ['postId', 'createdAt', 'count', 'creator'];
		// if (_.contains()) {
		// }
		var resJson = {
			'success' : true,
			'data' : {}
		};

		//all Post
		Post.find({}, function(err, posts) {
		    if (err) throw err;
		    resJson.data = posts;
		    res.send(resJson);
		}).sort({
		    created_at: 1
		});



	})

	.post(function(req, res) {
		var content = req.body.content;
		var creator = req.body.creator;

		if (creator === undefined) creator = 'Secret user';
		if (content === undefined) {
			res.status(400).json({
				success : false,
			    message: 'Params Missing'
			});
			return;
		}
		var newPost = new Post({
		    content: content,
		    creator: creator
		});

		newPost.save(function(err) {
		    if (err) throw err;
		    console.log('User saved successfully!');
		    res.status(201).json({
		    	success : true,
		        message: 'Post Created'
		    });
		    return;
		});
	})

	.put(function(req, res) {
		//Check Key

	})
	.delete(function(req, res) {
		//Check Key
	});

module.exports = router;
