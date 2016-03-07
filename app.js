var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
//var users = require('./routes/users');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var connect        = require('connect');
var methodOverride = require('method-override');





mongoose.connect('mongodb://localhost:27017/science');

var app = express();

app.use(methodOverride('_method'));

app.engine('ejs', require("ejs-locals"));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/admin', admins);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// some troubles with ejs-locals
app.locals.makePreview = function(text) {
    var preview ="";
    var tmp = text.split(" ");
    for (var i = 0; i < 50; i++) {
      preview += tmp[i] + " ";
    }

    return preview + "...";
  };


  app.locals.transformDate = function(date) {
    return date.getDate() + "." + (+(date.getMonth())+1) + "." + date.getFullYear();
  }


module.exports = app;
