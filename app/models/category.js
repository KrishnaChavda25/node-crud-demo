//load the things we need
var mongoose = require('mongoose');

//define the schema for our user model
var categorySchema = mongoose.Schema({	
	_id:{ type: Number, default: 1 },
	title: String,
	created_date: Date,
	updated_date: Date,
	active_hash: String
}, { collection: 'categories' });

//create the model for users and expose it to our app
var Category = mongoose.model('categories', categorySchema);
module.exports = Category;