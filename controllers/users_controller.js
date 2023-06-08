const User= require('../models/user')
module.exports.profile= (req,res)=>{
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id).then((user)=>{
            res.render('profile',{
                title: "Profile",
                User: user
            })
        }).catch((error)=>{
            res.redirect('/users/sign-in')
        })
    
    }
    else{
        res.redirect('/users/sign-in')
    }

}
module.exports.feeds=(req,res)=>{
    res.render('feeds',{
        title:'User feeds'
    })
}
module.exports.signup=(req,res)=>{
    res.render('sign_up',{
        title:'Codial | Signup'
    })
}
module.exports.signin=(req,res)=>{ 
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
                return res.redirect('/users/sign-in');
            }).catch((error)=>{
                console.log("Error in creating user while signing up ", error)

            })

        }
        else{
            res.redirect('back')
        }

    }).catch((error)=>{
        console.log('error',err)

    })
}
module.exports.createSession=(req,res)=>{
    // steps to authenticate
    //  finde the user
    User.findOne({email:req.body.email}).then((user)=>{
        // handle user found
        if(user){
            // handle password mismatches
            if(user.password!=req.body.password){
                return res.redirect('back')
            }

            // handle session creation
            res.cookie('user_id ',user.id);
            return res.redirect('/users/profile');

        }
        else{
            // handle user not found
            res.send('User not found')
        }

    }).catch((error)=>{
        console.log("Error in creating the session ",error)
        return;
    })
}
module.exports.signOut=(req,res)=>{
    // console.log("clear cookie")
    // return res.clearCookie('user_id')
    res.clearCookie('user_id');
    res.redirect('/users/sign-in')
    
    

}