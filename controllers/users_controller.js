const passwordResetMailer=require('../mailers/reset_password_mailer')
const passwordResetWorker=require('../workers/reset_password_worker')
const User= require('../models/user')
const queue=require('../config/kue')
const Reset_Tokens=require('../models/reset_pass_tokens')

const fs = require('fs');
const path = require ('path')
const crypto = require('crypto');


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
module.exports.forgotPassword=function(req,res){
    return res.render('forgot_password',{
        title:'Codial | Forgot Password'
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
                req.flash('success', 'sucessfuly singed up as ',user.name)
                return res.redirect('/users/sign-in');
            }).catch((error)=>{
                console.log('inside create/usersControllers')
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
    req.flash('success','Logged in successfully')
    console.log("session created")
    return res.redirect('/');
    
}
module.exports.distroySession=(req,res)=>{
    
        req.logout((error)=>{
            if(error){
                console.log("Error signingOut",error)
                return 
            }

            req.flash('success','Logged out successfully')
            return res.redirect('/')
            
        })
        // req.flash('success','Logged out successfully!')
        // return res.redirect('/')
}
module.exports.update= async function(req,res){
    try{
        
        if(req.user.id == req.params.id){
            let user = await User.findByIdAndUpdate(req.params.id, req.body );
            User.uploadedAvatar(req,res,(err)=>{
                if(err){
                    console.log('*****MULTER ERROR*****',err)

                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar){
                      fs.unlinkSync(path.join(__dirname,'..',user.avatar))

                    }
                    // this is saving the path of the uploaded path in the avatar field of the user
                    user.avatar=User.avatarPath+'/'+req.file.filename
                    console.log('user.avatar is: ',user.avatar)

                }
                user.save()
                
            })
            req.flash('success','user updated')
            return res.redirect('back');
        }else{
            return res.status(401).send('Unauthorized');
        }
    }
     catch{
        res.send('Error while updating user')  
     }
    
      
}
module.exports.resetPassword=async function(req,res){
    try{
    let user= await User.findOne({email:req.body.reset_mail})
    if(user){
    let Token = await Reset_Tokens.create({
        user:user,
    
        accessToken:crypto.randomBytes(100).toString('hex'),
    
        isValid:true
    })
     console.log('your passResetToken is ',Token)
    //  passwordResetMailer.resetPasswordToken(Token)
    let job = queue.create('resetemail',Token).save(function(err){
        if(err){
            console.log('Error in creating qeue for  reset_password_mailer ',err)
        }
        console.log(job.id)
    })
    
    console.log('user: ', user)

    }
    return res.render('account_recovery',{
        title:'Account Recovry || Codial',
        resetUser:user,
        resetMail:req.body.reset_mail
        
    })

 }
 catch{
    (err)=>{
        console.log(err)
    }
 }

}
module.exports.askNewPassword=async function(req,res){
    // try{
    // var resetToken =  await Reset_Tokens.findOne({accessToken:req.params.accessToken})
    // console.log('findOne result: ',resetToken)
    // console.log('token in url:',req.params.accessToken.toString())
    // console.log('token inside ask password: ',token)
    // return res.render('create_new_password',{
    //     token:resetToken,
    //     title:'Create new Password'
        
    // })
    // }
    // catch{
    //     console.log('Error in finding User')
    // }

    
    Reset_Tokens.findOne({
        accessToken:req.params.accessToken.toString()
        
    }).then((token)=>{
        console.log('token inside url :',req.params.accessToken)
        console.log('Token inside the findOne: ',token)
        return res.render('create_new_password',{
            title:'Create a new password | Codial',
            token:token

        })


    })
    

}
module.exports.setNewPassword=async function(req, res){
    try{
    let token = await Reset_Tokens.findOne({accessToken:req.params.accessToken})
    console.log('Token inside setNewPassword:',token)
    if(token.isValid){
        if(req.body.new_password!=req.body.confirm_new_password){
            return res.send('<h1>Password and confirm Passwords dont match, please try again<h1>')
        }
        else{
            console.log('user_id of updation: ',token.user._id," confirm passsword ",req.body.confirm_new_password)
            let updatePassword=await User.findOneAndUpdate({
                _id:token.user._id


            },{password:req.body.confirm_new_password})
            
            console.log('Password set successfully')
            let setFalse=await Reset_Tokens.findOneAndUpdate({accessToken:req.params.accessToken},{isValid:false}) 
            }
            // return res.redirect('/users/reset-password/successfully')
            return res.send(
                '<h1> password set successfully</h1> <a href="/users/sign-in">return to login</a>'
                
                )
        }else{
            res.send('Your access token expired plese request for password change again!')
        }
    }catch(err){
        console.log('Error while update the password', err)
    }

}
// module.exports.resetSucessful=function(req,res){

//     res.render('reset_successful',{
//         title:'Password Reset Successfully | Codial'
//     })
// }
