var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	content: String,
	creator : String,
	created_at : Date,
	updated_at : Date
});
postSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});
var Post = mongoose.model('Post', postSchema);
module.exports = Post;