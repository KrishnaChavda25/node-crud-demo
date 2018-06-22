// require all packages which is useful
var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');

// access models
var User = require('../models/home');
var Blog = require('../models/blog');
var Category = require('../models/category');

// Check if user is loogged in or not, if not redirect to /login
exports.loggedIn = function(req, res, next)
{
	if (req.session.user) { // req.session.passport._id
		next();
	} else {
		res.redirect('/login');
	}
}

// for home page
exports.front = function(req, res) {
	res.render('index', {layout: false});
}

// for admin panel home page
exports.home = function(req, res) {
	User.find().exec(function (err, results) {
		var users = results.length
		Blog.find().exec(function (err, results) {
			var blogs = results.length
			Category.find().exec(function (err, results) {
				var categories = results.length
				res.render('home.ejs', {
					error : req.flash("error"),
					success: req.flash("success"),
					session:req.session,
					name: req.session.user.name,
					users: users,
					blogs: blogs,
					categories: categories,
				});
			});
		});
	});	
}

// register
exports.signup = function(req, res) {
	if (req.session.user) {
		res.redirect('/admin');
	} else {
		res.render('signup', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session,
			layout: false
		});
	}
}

// login
exports.login = function(req, res) {
	if (req.session.user) {
		res.redirect('/admin');
	} else {
		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session,
			layout: false
		});
	}
}

// logout
exports.logout = function (req, res){
  req.session.destroy(function (err) {
  	//Inside a callback… bulletproof!
    res.redirect('/login');
  });
};

// List all users
exports.users = function(req, res) {
	if (req.session.user) {
		User.find((err, users) => {
			if (err) return console.log(err)
				res.render('users',{users:users});
		})
	} else {
		res.redirect('/login');
	}
}