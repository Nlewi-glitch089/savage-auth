// server.js

// load variables from a local .env file if there is one
// (on Render they are set in the dashboard instead, so a missing file is fine)
try {
    process.loadEnvFile();
} catch (err) {
    if (err.code !== 'ENOENT') throw err;
}

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is not set. Copy .env.example to .env for local development, or add it under Environment in the Render dashboard.');
}

var db

// configuration ===============================================================
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))


app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: process.env.SESSION_SECRET, // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// launch ======================================================================
// The routes need the database, so connect first and only start listening once
// it's ready. Before, the server listened right away and only added the routes
// after connecting, so a failed connection left every page as "Cannot GET /".
// Now a failed connection exits with an error, which Render shows as a failed deploy.
// mongoose 7+ no longer accepts a callback here, so wait on the promise instead.
// db is the native MongoDB driver database the message routes use.
mongoose.connect(configDB.url)
  .then(() => {
    db = mongoose.connection.db
    require('./app/routes.js')(app, passport, db);
    app.listen(port);
    console.log('The magic happens on port ' + port);
  })
  .catch(err => {
    // only the name and message: the full error object includes connection details
    console.error('Could not connect to MongoDB:', err.name, '-', err.message);
    process.exit(1);
  });
