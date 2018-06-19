var home = require('../app/controllers/home');
var blog = require('../app/controllers/blog');
var category = require('../app/controllers/category');

//you can include all your controllers

module.exports = function (app, passport) {

    app.get('/login', home.login);
    app.get('/signup', home.signup);

    app.get('/admin/', home.loggedIn, home.home);//home
    app.get('/admin/home', home.loggedIn, home.home);//home

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/admin/home', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/admin/home', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/admin/blogs', blog.list);
    app.get('/admin/blogs/create', blog.create);
    app.post('/admin/blogs/save', blog.save);
    app.get('/admin/blogs/edit/:id', blog.edit);
    app.post('/admin/blogs/update/:id', blog.update);
    app.get('/admin/blogs/show/:id', blog.show);
    app.get('/admin/blogs/delete/:id', blog.delete);

    app.get('/admin/categories', category.list);
    app.get('/admin/categories/create', category.create);
    app.post('/admin/categories/save', category.save);
    app.get('/admin/categories/edit/:id', category.edit);
    app.post('/admin/categories/update/:id', category.update);
    app.get('/admin/categories/delete/:id', category.delete);


}
