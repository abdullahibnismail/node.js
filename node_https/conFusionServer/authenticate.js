const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./modals/user');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const config = require('./config');

exports.local = passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey,
        {expiresIn:3600})
}

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload,done)=>{
        console.log("JWT Payload",jwt_payload);
        User.findOne({_id: jwt_payload._id},(err,user) => {
            if(err){
                return done(err,false);
            }
            else if(user){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        })
    }))
function verifyAdmin(req, res, next) {
        if (req.user && req.user.admin === 'admin') {
            return next();
        } 
        else {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }    
    }    

exports.verifyUser = passport.authenticate('jwt',{session:false});
exports.verifyAdmin = passport.authenticate('jwt',{session:false});
