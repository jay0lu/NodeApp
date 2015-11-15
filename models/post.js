var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	content: String,
	creator : String,
	created_at : String,
	updated_at : String
});
postSchema.pre('save', function(next) {
    var currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(currentDate);
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});
var Post = mongoose.model('Post', postSchema);
module.exports = Post;