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
    if(req.body.password != req.body.confirm_password){
        console.log('user is not created');
        res.redirect('back')
        User.findOne({email:req.body.email},(error,user)=>{
            if(error){console.log('Error in creating user!'); return;}
            if(!user){
                User.create(req.body,(error,user)=>{
                    if(error){console.log('Error in creating user!'); return;}
                    return res.redirect('/users/sign-in')

                })
                
            }
            else{
                console.log('user is created successfuly')
                return res.redirect('/users/create')
                
            }
        })
    }


}
module.exports.createSession=(req,res)=>{
    
}