var express = require('express');
var mongoose = require('mongoose');
var Post = require('../models/post');
var router = express.Router();
var _ = require('underscore');
mongoose.connect('mongodb://localhost/nodeapp');

router.route('/').get(function (req, res) {
	res.json({
		success : true,
	    message: 'hooray! welcome to my api!'
	});
});

router.route('/posts/')
	.get(function(req, res) {
		var postId = req.query.postId;
		var createdAt = req.query.createdAt;
		var count = req.query.count;
		var creator = req.query.creator;
		var keyword = req.query.keyword;
		var resJson = {
			'success' : true,
			'data' : {}
		};

		if (postId !== undefined) {
			Post.find({'postId' : postId}, function(err, posts) {
			    if (err) throw err;
			    if (posts.length == 1) {
			    	resJson.data = posts;
			    	res.send(resJson);
			    } else {
			    	resJson.success = false;
			    	res.send(resJson);
			    }
			});
			return;
		}

		if (creator !== undefined) {
			Post.find({'creator' : creator}, function(err, posts) {
			    if (err) throw err;
			    if (posts.length !== 0) {
			    	resJson.data = posts;
			    	res.send(resJson);
			    } else {
			    	resJson.success = false;
			    	resJson.data = 'NOT FOUND';
			    	res.send(resJson);
			    }
			});
			return;
		}

		if (keyword !== undefined) {
			
		}

		//find all Post
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
