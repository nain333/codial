const passport = require('passport')
const JWTStratergy=require('passport-jwt').Strategy
const ExtractJWT= require('passport-jwt').ExtractJwt
const user = require('../models/user')
let opt={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codial'
}
passport.use(new JWTStratergy(opt,function(jwtPayload,done){
    user.findById(jwtPayload._id),function(err,user){
        if(err){console.log('Error in finding user from jwt: ',err)}
        if(user){
            return done(null,user)
        }
        else{
            return done(null,false)
        }

    }
}))
module.exports=passport