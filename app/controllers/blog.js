// require all packages which is useful
var express  = require('express');
var numeral = require('numeral');

// access models
var Blog = require('../models/blog');
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

// CRUD method for BLOG

// List all blogs
exports.list = function(req, res) {
	if (req.session.user) {
		Blog.find((err, blogs) => {
			if (err) return console.log(err)
				res.render('blogs/list',{blogs:blogs});
		})
	} else {
		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});
	}
}

// Create new blog
exports.create = function(req, res) {
	if (req.session.user) {
		message = '';
		Category.find((err, categories) => {
			categories = categories;
			if (err) return console.log(err)
				res.render('blogs/create',{message: message, categories:categories});
		})
	} else {
		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});
	}
}

// Save new blog
exports.save = function(req, res, next) {
	if (req.session.user) {
		Blog.find().sort([['_id', 'descending']]).limit(1).exec(function(err, blogdata) {	
			if(blogdata.length > 0)
			{
				my_id = blogdata[0]._id + 1;
			}
			else
			{
				my_id =1;
			}
			if (req.body.title && req.body.author && req.body.description && req.body.category_id) {
				message = '';
				var blogData = {
					category_id: req.body.category_id,
					title: req.body.title,
					author: req.body.author,
					description: req.body.description,
					created_date: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss"),
					updated_date: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss"),
					status: 'active',
					_id: my_id,
				}
				Blog.create(blogData, function (error, user) {
					if (error) {
						return next(error);
					} else {
						res.redirect('/admin/blogs');
					}
				});
			}
			else {
				Category.find((err, categories) => {
					categories = categories;
					message = 'All fields required.';
					res.render('blogs/create', {message: message, categories: categories});
				})
			}
		});
	} else {
		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});
	}
};

// Edit blog
exports.edit = function(req, res) {
	if (req.session.user) {
		//calling the function from blogs/edit.ejs class using routes object..
		message = '';
		Blog.findOne({ _id: req.params.id }, function(err, blog) {
			Category.find((err, category) => {
				console.log('blog : ', JSON.stringify(blog));
				res.render('blogs/edit', {blog: blog, message: message, category: category})
			})
		});
	} else {
		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});
	}
};

// Update blog
exports.update = function(req, res) {
	if (req.session.user) {
		console.log('blog : ', req.params.id);
		if (req.body.title && req.body.author && req.body.description && req.body.category_id) {
			message = '';
			var blogData = {
				category_id: req.body.category_id,
				title: req.body.title,
				author: req.body.author,
				description: req.body.description,
				created_date: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss"),
				updated_date: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss"),
				status: 'active',
			}
			Blog.update({_id: req.params.id}, blogData, function (error) {
				if (error) {
					return next(error);
				} else {
					res.redirect('/admin/blogs');
				}
			});
		}
		else {
			message = 'All fields required.';
			res.render('blogs/create', {message: message});
		}
	} else {
		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});
	}
}

// See blog
exports.show = function(req, res) {
	if (req.session.user) {
		message = '';
		Blog.findOne({ _id: req.params.id }, function(err, blog) {
			console.log('blog : ', JSON.stringify(blog));
			res.render('blogs/show', {blog: blog, message: message})
		});
	} else {
		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});
	}
}

// Delete blog
exports.delete = function(req, res) {
	if (req.session.user) {
		Blog.findByIdAndRemove(req.params.id, (err, todo) => {  
		// As always, handle any potential errors:
		if (err) return res.status(500).send(err);
			message: "Todo successfully deleted",
			res.redirect('/admin/blogs');
		});
	} else {
		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});
	}
}