const passport= require('passport')
const LocalStratergy=require('passport-local');
const User = require('../models/user');
passport.use(new LocalStratergy({
    usernameField: 'email'
    },
    function(email,password,done){
        // find the user and establish the identity
        User.findOne({email:email}).then((user)=>{
            if(!user|| user.password!=password){
                console.log('invalid username/Password');
                return done(null,false)
            }
            return done(null, user); 

        }).catch((error)=>{
            console.log('error in finding user --> Passport')
            return done(error)
        })

    }
    ))
    // serializing the user to decide which kiey is to be kept in cookies
    passport.serializeUser((user,done)=>{
      console.log("Serialized User")
      done(null,user.id)

    })
    // disirialize the user
    passport.deserializeUser((id,done)=>{
      User.findById(id).then((user)=>{
        return done(null,user)


      }).catch((error)=>{
        console.log("error in desirializing  the user Error --> Passport")
        return done(error);

      })  
    })

    // check if the user is authanticated
    passport.checkAuthentication = (req, res, next) => {
        // If the user is signed in, then pass the request to the next middleware or controller's function
        if (req.isAuthenticated()) {
          return next();
        } else {
          return res.redirect('/users/sign-in');
        }
      };
      
        

    passport.setAuthenticatedUser=(req,res,next)=>{
        if(req.isAuthenticated()){
            // req.user contains the currrent signed in user from the session cookie , just sending it to the locals for the views
            res.locals.user = req.user
            console.log("set authenticated user ")
    
        }
        next();


    }
    module.exports= passport;