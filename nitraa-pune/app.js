var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginAdminRouter = require('./routes/login-admin/index');
var adminModeratorCRUDRouter = require('./routes/admin-moderator-CRUD/index');
var signinUserRouter = require('./routes/userSignin/index');
var signupUserRouter = require('./routes/userSignup/index');
var loginModeratorRouter = require('./routes/moderator-auth/index');
var moderatorGallery = require('./routes/moderator-utility/gallery/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login-admin', loginAdminRouter);
app.use('/admin-moderator-crud', adminModeratorCRUDRouter);
app.use('/signin-user', signinUserRouter);
app.use('/signup-user', signupUserRouter);
app.use('/login-moderator', loginModeratorRouter);
app.use('/moderator-gallery', moderatorGallery);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;