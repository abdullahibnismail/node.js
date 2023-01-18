var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var FileStore = require('session-file-store')(session)

const passport = require('passport');
const authenticate = require('./authenticate');
const config = require('./config');

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
const url = config.mongoUrl;
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
//while using assign cookies we use cookies parser
// app.use(cookieParser('12345-67890-09876-54321'));
//while using express-session
// app.use(session({
//   name:'session-id',
//   secret:'12345-67890-09876-54321',
//   saveUninitialized:false,
//   resave:false,
//   store: new FileStore()
// }))

// function auth(req,res,next){
//   // console.log(req.headers);
//   // console.log(req.signedCookies);
//   console.log(req.session);
//   // if(!req.signedCookies.user){
//   if(!req.session.user){
    
//     const authHeader = req.headers.authorization;

//     if(!authHeader){
//       const err =  new Error('You are not authenticated');
//       res.setHeader("WWW-Authenticate","Basic");
//       err.status = 401;
//       return next(err);  
//     }

//     const auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');

//     const username = auth[0];
//     const password = auth[1];

//     if(username ==='admin' && password === 'admin'){
//       // res.cookie('user','admin',{signed:true})
//       req.session.user = 'admin'
//       next();
//     }
//     else{
//       const err =  new Error('You are not authenticated');
//       res.setHeader("WWW-Authenticate","Basic");
//       err.status = 401;
//       return next(err); 
//     }
//   }
//   else{
//     // if(req.signedCookies.user === 'admin'){
//     if(req.session.user === 'admin'){
//       next()
//     }
//     else{
//       const err =  new Error('You are not authenticated');
//       err.status = 401;
//       return next(err); 
//     }
//   }

// }
app.use(passport.initialize());
// app.use(passport.session())


app.use('/', indexRouter);
app.use('/users', usersRouter);

// function auth (req, res, next) {

//   if(!req.user) {
//       var err = new Error('You are not authenticated!');
//       err.status = 403;
//       return next(err);
//   }
//   else {
//     next();
//   }
// }


// app.use(auth)

app.use(express.static(path.join(__dirname, 'public')));

//Definning Routes Path

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
