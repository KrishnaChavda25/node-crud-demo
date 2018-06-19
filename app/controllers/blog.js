var express  = require('express');
var numeral = require('numeral');
var Blog = require('../models/blog');
var dateFormat = require('dateformat');
var router = express.Router();


expressValidator = require('express-validator');
app = express();
app.use(expressValidator());
/***************Mongodb configuratrion********************/
var mongoose = require('mongoose');
//configuration ===============================================================
mongoose.connect('mongodb://final_demo_98:final_demo_98@ds259820.mlab.com:59820/final_auth_demo'); // connect to our database
var db

router.getImageById = function(id, callback) {
  
 Blog.findById(id, callback);
 
}

exports.list = function(req, res) {
	
	if (req.session.user) {

		Blog.find((err, result) => {
				if (err) return console.log(err)
					console.log(result[0].title);
					res.render('blogs/list',{result:result});
			})

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
		message = '';
		res.render('blogs/create',{message: message});

	} else {

		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});

	}
	
}

exports.save = function(req, res, next) {
	if (req.session.user) {

	Blog.find().sort([['_id', 'descending']]).limit(1).exec(function(err, blogdata) {	
        if (req.body.title &&
		    req.body.author &&
		    req.body.description) {

           message = '';
           var blogData = {
		      title: req.body.title,
		      author: req.body.author,
		      description: req.body.description,
		      created_date: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss"),
		      updated_date: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss"),
		      status: 'active',
		      _id: blogdata[0]._id + 1,
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
		});
	} else {

		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});

	}
    };


exports.edit = function(req, res) {
 		if (req.session.user) {
			//calling the function from index.js class using routes object..
			message = '';
			Blog.findOne({ _id: req.params.id }, function(err, doc) {
		      console.log('blog : ', JSON.stringify(doc));
		      res.render('blogs/edit', {blog: doc, message: message})
		    });
		} else {

		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});

	}
};

exports.update = function(req, res) {


	
	if (req.session.user) {
		console.log('blog : ', req.params.id);

		if (req.body.title &&
		    req.body.author &&
		    req.body.description) {

           message = '';
           var blogData = {
		      title: req.body.title,
		      author: req.body.author,
		      description: req.body.description,
		      created_date: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss"),
		      updated_date: dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss"),
		      status: 'active',
		    }

		    Blog.update({_id: req.params.id}, blogData, function (error, user) {
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
		message = '';
			Blog.findOne({ _id: req.params.id }, function(err, doc) {
		      console.log('blog : ', JSON.stringify(doc));
		      res.render('blogs/show', {blog: doc, message: message})
		    });
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


    