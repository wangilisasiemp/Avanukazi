var express = require('express');
// setup mongoose connection
var mongoose=require('mongoose');
var mongoDB=process.env.MONGODB_URI || 'mongodb://avanuapp:faraja0305@ds145438.mlab.com:45438/avanuapp';
mongoose.connect(mongoDB);
mongoose.Promise=global.Promise;
var db=mongoose.connection;
db.on('error',console.error.bind(console,'Mongo Connection Error:'));
//end of setting up of mongoose connection


var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
var passport=require('passport');
var index = require('./routes/index');
var users = require('./routes/users');
var catalog=require('./routes/catalog');
var compression = require('compression');
var helmet=require('helmet');
var flash= require('connect-flash');

var app = express();

app.use(helmet());
//compress all routes
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({secret:'karibunisanakatikakuchapakodimust'}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', index);
app.use('/users', users);
app.use('/catalog',catalog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
