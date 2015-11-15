var express = require('express');
var mongoose = require('mongoose');
var Post = require('../models/post');
var Admin = require('../models/admin');
var config = require('../config');
var router = express.Router();
var authRouter = express.Router();
var jwt = require('jsonwebtoken');
var passUtil = require('../tools/passUtil');

mongoose.connect('mongodb://localhost/nodeapp');

//------------------- router -------------------
router.route('/').get(function (req, res) {
	res.json({
		success : true,
	    message: 'hooray! welcome to my api!'
	});
});

router.route('/auth').post(function (req, res) {
	Admin.findOne({
		username : req.body.username
	}, function (err, admin) {
		if (err) throw err;
		if (!admin) {
			res.status(400).json({
				success : false,
				message : 'Authentication Failed. User Not Found.'
			});
		} else {
			var plainPass = req.body.password;
			var hashedPass = admin.password;
			if (!passUtil.validatePassword(plainPass, hashedPass)) {
				res.status(400).json({
					success : false,
					message : 'Authentication Failed. Wrong Password.'
				});
			} else {
				var token = jwt.sign(admin, config.secret, {
					expiresIn: 900
				});
				res.status(200).json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}
		}
	});
});

router.route('/posts')
	.get(function(req, res) {
		var postId = req.params.postId;
		var createdAt = req.query.createdAt;
		var count = Number(req.query.count);
		var creator = req.query.creator;
		var keyword = req.query.keyword;

		var resJson = {
			'success' : true,
			'data' : {}
		};

		var query = {};
		if (postId !== undefined) query.postId = postId;
		if (creator !== undefined) query.creator = creator;

		//Query database with keyword
		if (keyword !== undefined) {

		}
		Post.find(query)
			.limit(count)
		    .sort({ created_at: -1 })
		    .exec(function(err, posts) {
		        if (err) throw err;
		        if (posts.length !== 0) {
		            resJson.data = posts;
		            res.status(200).send(resJson);
		        } else {
		            resJson.success = false;
		            resJson.data = 'NOT FOUND';
		            res.status(200).send(resJson);
		        }
		    });
	})

	.post(function(req, res) {
		var content = req.body.content;
		var creator = req.body.creator;

		if (!creator) creator = 'Secret user';
		if (!content) {
			return res.status(400).json({
				success : false,
			    message: 'Params Missing'
			});
		}

		var newPost = new Post({
		    content: content,
		    creator: creator
		});

		newPost.save(function(err) {
		    if (err) throw err;
		    return res.status(201).json({
		    	success : true,
		        message: 'Post Created'
		    });
		});
	});

router.route('/posts/:postId').get(function (req, res) {
	var postId = req.params.postId;
	var resJson = {'success' : true};
	Post.findById(postId, function(err, post) {
		if (err) {
			resJson.success = false;
			resJson.message = 'Not Found';
			return res.status(400).send(resJson);
		}
		if (post) {
		    resJson.data = post;
		    res.status(200).send(resJson);
		}
	});

});
//------------------- router ends -------------------


//------------------- authRouter -------------------
authRouter.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
    	return res.status(403).send({ 
    	    success: false, 
    	    message: 'No token provided.' 
    	});
    }
});

authRouter.route('/posts/:postId')
	.put(function(req, res) {
		var postId = req.params.postId;
		var content = req.body.content;
		if (!postId || !content) {
		    return res.status(403).send({
		        success: false,
		        message: 'Params Missing'
		    });
		} else {
		    var query = {'_id': postId};
		    var update = {content: content};
		    var options = {new: true};
		    Post.findOneAndUpdate(query, update, options, function(err, post) {
		        if (err) {console.log('got an error');}
		        if (post) {
		        	return res.status(201).send({ 
		        	    success: true, 
		        	    data: post
		        	});
		        } else {
		        	return res.status(204).send({ 
		        	    success: false, 
		        	    message: 'No Post Found' 
		        	});
		        }

		    });
		}

	})
	.delete(function (req, res) {
		var postId = req.params.postId;
		if (!postId) {
			return res.status(403).send({ 
			    success: false, 
			    message: 'PostId Missing' 
			});
		} else {
			Post.findOneAndRemove({ '_id' : postId}, function(err, post) {
				if (err) console.log(err);
				if (post) {
					return res.status(201).send({ 
					    success: true, 
					    message: 'Post Deleted' 
					});
				} else {
					return res.status(403).send({ 
					    success: false, 
					    message: 'No Post Found' 
					});
				}
			});
		}
	});

module.exports = {
	router : router,
	authRouter : authRouter
};
