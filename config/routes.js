var home = require('../app/controllers/home');
var blog = require('../app/controllers/blog');

//you can include all your controllers

module.exports = function (app, passport) {

    app.get('/login', home.login);
    app.get('/signup', home.signup);

    app.get('/', home.loggedIn, home.home);//home
    app.get('/home', home.loggedIn, home.home);//home

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/blogs', blog.list);
    app.get('/blogs/create', blog.create);
    app.post('/blogs/save', blog.save);
    app.get('/blogs/edit/:id', blog.edit);
    app.post('/blogs/update/:id', blog.update);
    app.get('/blogs/show/:id', blog.show);
    app.delete('/blogs/delete/:id', blog.delete);


}
