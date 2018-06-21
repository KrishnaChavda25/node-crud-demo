//you can include all your controllers here

var home = require('../app/controllers/home');
var blog = require('../app/controllers/blog');
var category = require('../app/controllers/category');
const { check, validationResult } = require('express-validator/check');

// all routes
module.exports = function (app, passport) {

    // access login page
    app.get('/login', home.login);

    // access register page
    app.get('/signup', home.signup);

    // logout
    app.get('/logout', home.logout);

    // front home page
    app.get('/', home.front);

    // admin panel home page
    app.get('/admin', home.loggedIn, home.home);//home

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/admin', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/admin', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // list all users
    app.get('/admin/users', home.users);

    // blog crud routes
    app.get('/admin/blogs', blog.list);
    app.get('/admin/blogs/create', blog.create);
    app.post('/admin/blogs/save', blog.save);
    app.get('/admin/blogs/edit/:id', blog.edit);
    app.post('/admin/blogs/update/:id', blog.update);
    app.get('/admin/blogs/show/:id', blog.show);
    app.get('/admin/blogs/delete/:id', blog.delete);

    // category crud routes
    app.get('/admin/categories', category.list);
    app.get('/admin/categories/create', category.create);
    app.post('/admin/categories/save', [
      check('title')
        .exists().withMessage('must be enter')
    ], category.save);
    app.get('/admin/categories/edit/:id', category.edit);
    app.post('/admin/categories/update/:id', category.update);
    app.get('/admin/categories/delete/:id', category.delete);

}
