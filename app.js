// require all packages which is useful
var express = require('express');
var app = express();
var multer = require('multer')
var constants = require('constants');
var constant = require('./config/constants');
var port = process.env.PORT || 8042;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

// get information from html forms
var bodyParser = require('body-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var now = new Date();
var ejsLayouts = require("express-ejs-layouts");

// use it in our app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(ejsLayouts);

//connect your database
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

// pass passport for configuration
require('./config/passport')(passport);

//set up our express application
// log every request to the console
app.use(morgan('dev'));
 // read cookies (needed for auth)
app.use(cookieParser());

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));

// set up ejs for templating
app.set('view engine', 'ejs');
app.use('/static', express.static('./static'));
app.use(session({
    secret: 'I Love India...',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());

 // persistent login sessions
app.use(passport.session());

// use connect-flash for flash messages stored in session
app.use(flash());


// share loguser in all views
var middleware = {

    globalLocals: function (req, res, next) {
        loguser = req.session.user,
        next();
    }

};

app.use(middleware.globalLocals);

// load our routes and pass in our app and fully configured passport
require('./config/routes.js')(app, passport);

//launch
app.listen(port);
console.log('The magic happens on port ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
});

app.use(function (req, res, next) {
    res.status(500).render('404', {title: "Sorry, page not found"});
});
exports = module.exports = app;