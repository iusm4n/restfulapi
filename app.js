var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var usersRouter = require('./routes/api/users');
const config = require('config');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//setting home page
//assuming app is express Object.
app.get('/',function(req,res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});
//setting api users
app.use('/api/users', usersRouter);

mongoose
  .connect(config.get('db'))
  .then(() => console.log("Connected to Mongo..."))
  .catch((error) => console.log("mongo disconnected")); 
module.exports = app;
