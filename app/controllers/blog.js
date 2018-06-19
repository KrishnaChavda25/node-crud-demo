var express  = require('express');
var numeral = require('numeral');
var Blog = require('../models/blog');
var dateFormat = require('dateformat');


expressValidator = require('express-validator');
app = express();
app.use(expressValidator());
/***************Mongodb configuratrion********************/
var mongoose = require('mongoose');
//configuration ===============================================================
mongoose.connect('mongodb://final_demo_98:final_demo_98@ds259820.mlab.com:59820/final_auth_demo'); // connect to our database
var db

exports.list = function(req, res) {
	
	if (req.session.user) {
	db.collection("blogs", function(err, collection) {
		console.log('collection : ', collection);
	      collection.find().sort({order_num: 1}).toArray(function(err, result) {
	        if (err) {
	          throw err;
	        } else {
	          for (i=0; i<result.length; i++) {
	            collectionOne[i] = result[i];
	          }
	        }
	      });
		res.render('blogs/list');
	});

	} else {

		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});

	}
	
}

exports.create = function(req, res) {


	
	if (req.session.user) {

		res.render('blogs/create');

	} else {

		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});

	}
	
}

exports.save = function(req, res, next) {

        if (req.body.title &&
    req.body.author &&
    req.body.description) {

           message = '';
           var blogData = {
		      title: req.body.title,
		      author: req.body.author,
		      description: req.body.description,
		    }

		    Blog.create(blogData, function (error, user) {
		      if (error) {
		        return next(error);
		      } else {
		        res.redirect('/blogs');
		      }
		    });

         }
         else {
		    message = 'All fields required.';
		    res.render('blogs/create', {message: message});
		  }
    };

exports.edit = function(req, res) {


	
	if (req.session.user) {

		res.render('blogs/list');

	} else {

		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});

	}
	
}

exports.update = function(req, res) {


	
	if (req.session.user) {

		res.render('blogs/list');

	} else {

		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});

	}
	
}

exports.show = function(req, res) {


	
	if (req.session.user) {

		res.render('blogs/list');

	} else {

		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});

	}
	
}

exports.delete = function(req, res) {


	
	if (req.session.user) {

		res.render('blogs/list');

	} else {

		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});

	}
	
}


    