// require all packages which is useful
var express  = require('express');
var numeral = require('numeral');

// access models
var Category = require('../models/category');

// for date
var dateFormat = require('dateformat');

// for routes
var router = express.Router();

// for data validation
expressValidator = require('express-validator');

app = express();
app.use(expressValidator());

//connect your database
var mongoose = require('mongoose');
mongoose.connect('mongodb://final_demo_98:final_demo_98@ds259820.mlab.com:59820/final_auth_demo');
var db
// CRUD method for Category

// List all categories
exports.list = function(req, res) {
	if (req.session.user) {
		Category.find((err, categories) => {
			if (err) return console.log(err)
				res.render('categories/list',{categories:categories});
		})
	} else {
		res.redirect('/login');
	}
}

// Create new category
exports.create = function(req, res) {
	if (req.session.user) {
		message = '';
		res.render('categories/create',{message: message});
	} else {
		res.redirect('/login');
	}
}

// Save new category
exports.save = function(req, res, next) {
	  if (req.session.user) {
		Category.find().sort([['_id', 'descending']]).limit(1).exec(function(err, categorydata) {	
			if(categorydata.length > 0)
			{
				my_id = categorydata[0]._id + 1;
			}
			else
			{
				my_id =1;
			}
			if (req.body.title) {
				message = '';
				var categoryData = {
					title: req.body.title,
					author: req.body.author,
					description: req.body.description,
					created_date: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss"),
					updated_date: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss"),
					status: 'active',
					_id: my_id,
				}
				Category.create(categoryData, function (error, user) {
					if (error) {
						return next(error);
					} else {
						res.redirect('/admin/categories');
					}
				});
			}
			else {
				message = 'Title is required.';
				res.render('categories/create', {message: message});
			}
		});
	} else {
		res.redirect('/login');
	}
};

// Edit category
exports.edit = function(req, res) {
	if (req.session.user) {
		//calling the function from categories/edit.ejs class using routes object..
		message = '';
		Category.findOne({ _id: req.params.id }, function(err, category) {
			res.render('categories/edit', {category: category, message: message})
		});
	} else {
		res.redirect('/login');
	}
};

// Update category
exports.update = function(req, res) {
	if (req.session.user) {
		if (req.body.title) {
			message = '';
			var categoryData = {
				title: req.body.title,
				author: req.body.author,
				description: req.body.description,
				created_date: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss"),
				updated_date: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss"),
				status: 'active',
			}
			Category.update({_id: req.params.id}, categoryData, function (error, user) {
				if (error) {
					return next(error);
				} else {
					res.redirect('/admin/categories');
				}
			});
		}
		else {
			message = 'Title is required.';
			res.render('categories/create', {message: message});
		}
	} else {
		res.redirect('/login');
	}
}

// See category
exports.show = function(req, res) {
	if (req.session.user) {
		message = '';
		Category.findOne({ _id: req.params.id }, function(err, category) {
			res.render('categories/show', {category: category, message: message})
		});
	} else {
		res.redirect('/login');
	}
}

// Delete category
exports.delete = function(req, res) {
	if (req.session.user) {
		Category.findByIdAndRemove(req.params.id, (err, todo) => {  
		// As always, handle any potential errors:
		if (err) return res.status(500).send(err);
			message: "Todo successfully deleted",
			res.redirect('/admin/categories');
			});
		} else {
			res.render('login', {
				error : req.flash("error"),
				success: req.flash("success"),
				session:req.session,
				layout: false
			});
		}
}