var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var User = require('../models/home');
var Blog = require('../models/blog');
var Category = require('../models/category');

exports.loggedIn = function(req, res, next)
{
	if (req.session.user) { // req.session.passport._id

		next();

	} else {

		res.redirect('/login');

	}

}

exports.home = function(req, res) {

	User.find().exec(function (err, results) {
		var users = results.length
		Blog.find().exec(function (err, results) {
			var blogs = results.length
			Category.find().exec(function (err, results) {
				var categories = results.length
				console.log('users : ', users);
				console.log('blogs : ', blogs);
				console.log('categories : ', categories);

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


exports.signup = function(req, res) {

	if (req.session.user) {

		res.redirect('/home');

	} else {

		res.render('signup', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});
	}

}


exports.login = function(req, res) {


	
	if (req.session.user) {

		res.redirect('/home');

	} else {

		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});

	}
	
}


    
