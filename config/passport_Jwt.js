const passport = require('passport');

const jwtStrategy = require('passport-jwt').Strategy;

const extractJwt = require('passport-jwt').ExtractJwt;

const registerUser = require('../models/registerUser')

let opts = {
  jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : 'secret'
}

passport.use(new jwtStrategy(opts, (payload,done)=> {
registerUser.findById(payload._id , (error,user)=> {
  if(error) {
    console.log(`record error in jwt`)
    return false
  }
  if (user) {
    return done (null,user)
  }
  else {
    return done (null,false)
  }
})
}))

passport.serializeUser((user,done)=> {
  return done (null,user._id)
});

passport.deserializeUser((user,done)=> {
  registerUser.findById(user._id, (error,user)=> {
    if (error){
      console.log(`error in desrializer`)
      return false;
    }
    return done (null,user)
  })
})