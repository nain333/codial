const passport = require('passport')
const googleStrategy=require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')
const User = require('../models/user')
passport.use(new googleStrategy({
    clientID:'1058883343370-rikbuqd63nqvgmjgkjve3prpf0sm9k13.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/users/auth/google/callback'
},function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).then(function(user){
            // if(error){
            //     console.log('error in strategy passport-google-oauth',error)
            // return
            
            // }
            console.log('profile: ',profile)
            if(user){
                console.log('user found in the db itself')
                return done(null, user)
            }else{
                console.log('inside the user creation using google-auth')
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                }).then(function(user){
                    console.log('user created successfuly: ',user)
                    return done(null,user)

                }).catch(function(error){
                    console.log("Error in creating user using passport-google-oauth-stategy")
                    return

                })
            }


        }).catch((error)=>{
            console.log('Error in signing up with google-strategy: ',error )
        })

}
))
module.exports=passport