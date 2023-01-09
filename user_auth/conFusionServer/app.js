var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promotionRouter = require('./routes/promotionRouter');
var leaderRouter = require('./routes/leaderRouter');

//Mongodb Driver
const mongoose = require('mongoose');

//Modals
const Dishes = require('./modals/dishes');
const Promotions = require('./modals/promotions');
const Leaders = require('./modals/leaders');

//db_Connection
const url = 'mongodb://127.0.0.1:27017/newtestdatabase';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected Successfully to the server");
}, (err) => {
  console.log(err);
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

function auth(req,res,next){
  console.log(req.headers);

  const authHeader = req.headers.authorization;

  if(!authHeader){
    const err =  new Error('You are not authenticated');
    res.setHeader("WWW-Authenticate","Basic");
    err.status = 401;
    return next(err);  
  }

  const auth = new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');

  const username = auth[0];
  const password = auth[1];

  if(username ==='admin' && password === 'admin'){
    next();
  }
  else{
    const err =  new Error('You are not authenticated');
    res.setHeader("WWW-Authenticate","Basic");
    err.status = 401;
    return next(err); 
  }
}

app.use(auth)

app.use(express.static(path.join(__dirname, 'public')));

//Definning Routes Path
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
