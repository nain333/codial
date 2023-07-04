const User= require('../models/user')
module.exports.profile = async function (req, res) {
    try {
    const user = await User.findById(req.params.id);
    return res.render("profile", {
    title: "Users",
    profile_users: user,
    });
    } catch (err) {
    console.error(err);
    return res.redirect("/");
    }
    };
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
    req.flash('Success','Logged in successfully')
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
        req.flash('success','Logged out successfully!')
        return res.redirect('/')
}
module.exports.update= async function(req,res){
    try{
        
        if(req.user.id == req.params.id){
            let user = await User.findByIdAndUpdate(req.params.id, req.body );
            console.log('req body is', req.body)
            return res.redirect('back');
        }else{
            return res.status(401).send('Unauthorized');
        }
    }
     catch{
        res.send('Error while updating user')
     }
}