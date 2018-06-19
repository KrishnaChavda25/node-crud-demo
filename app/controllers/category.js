var express  = require('express');
var numeral = require('numeral');
var Category = require('../models/category');
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

exports.list = function(req, res) {
	
	if (req.session.user) {

		Category.find((err, result) => {
				if (err) return console.log(err)
					res.render('categories/list',{result:result});
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
		res.render('categories/create',{message: message});

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
			Category.findOne({ _id: req.params.id }, function(err, doc) {
		      console.log('category : ', JSON.stringify(doc));
		      res.render('categories/edit', {category: doc, message: message})
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
		console.log('category : ', req.params.id);

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
			Category.findOne({ _id: req.params.id }, function(err, doc) {
		      console.log('category : ', JSON.stringify(doc));
		      res.render('categories/show', {category: doc, message: message})
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

		Category.findByIdAndRemove(req.params.id, (err, todo) => {  
		    // As always, handle any potential errors:
		    if (err) return res.status(500).send(err);
		    // We'll create a simple object to send back with a message and the id of the document that was removed
		    // You can really do this however you want, though.
		        message: "Todo successfully deleted",
		        res.redirect('/admin/categories');
		});

	} else {

		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});

	}
	
}


    