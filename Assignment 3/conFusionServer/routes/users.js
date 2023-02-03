var express = require('express');
const bodyParser = require('body-parser')
const User = require('../modals/user')
const passport = require('passport');
// const { authenticate } = require('passport');
const authenticate = require('../authenticate')

var router = express.Router();
router.use(bodyParser.json()) 

/* GET users listing. */
router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      return next(err);
    } 
    else {
      res.statusCode = 200;
      res.setHeader('Content_type', 'application/json');
      res.json(users);
    }
  })
});


/* SignUp New Users*/
router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
  req.body.password , (err,user)=>{
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err:err})
    }
    else {
      if(req.body.firstname)
        user.firstname = req.body.firstname;
      if(req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err,user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err:err})
        }
        passport.authenticate('local')(req,res,() => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true,status: 'Registration Successful!'});
        })  
      })    
    }
  })
});

/* LogIn  Users*/
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const token = authenticate.getToken({_id:req.user._id})
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true,token: token,status: 'You are successfully logged In!'});
})

/* LogOut Users*/
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});   

module.exports = router;
