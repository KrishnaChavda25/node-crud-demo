
//app/models/user.js
//load the things we need
var mongoose = require('mongoose');

//define the schema for our user model
var blogSchema = mongoose.Schema({	
	_id:{ type: Number, default: 1 },
	title: String,
	author: String,
	description: String,
	status: String,
	created_date: Date,
	updated_date: Date,
	active_hash: String
}, { collection: 'blogs' });

//create the model for users and expose it to our app
var Blog = mongoose.model('blogs', blogSchema);
module.exports = Blog;