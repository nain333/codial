const User= require('../models/user')
module.exports.profile= (req,res)=>{
    res.render('profile',{
        title:'profile'
    })
}
module.exports.feeds=(req,res)=>{
    res.render('feeds',{
        title:'User feeds'
    })
}
module.exports.signup=(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
   
    res.render('sign_up',{
        title:'Codial | Signup'
    })
}
module.exports.signin=(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    } 
    res.render('sign_in',{
        title:'Codial | Sign In'
    })
}
module.exports.create= (req,res)=>{
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back')
    }
    User.findOne({email:req.body.email}).then(function(user){
        if(!user){
            User.create(req.body).then((user)=>{
                console.log("User is created", user)
                return res.redirect('/users/sign-in');
            }).catch((error)=>{
                console.log("Error in creating user while signing up ", error)

            })

        }
        else{
            res.redirect('back')
        }

    }).catch((error)=>{
        console.log('error',error)

    })
}
module.exports.createSession=(req,res)=>{
    console.log("session created")
    return res.redirect('/');
    
}
module.exports.distroySession=(req,res)=>{
        req.logout((error)=>{
            if(error){
                console.log("Error signingOut",error)
                return 
            }

            return res.redirect('/')

        })
        return res.redirect('/')
}