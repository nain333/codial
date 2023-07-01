const Post = require('../models/posts')

// module.exports.create=async function(req,res){
//     Post.create(
//         {
//             content:req.body.content,
//             user:req.user._id
//         }
//     ).then(()=>{
//         res.redirect('back')
//     }).catch((error)=>{
//         console.log("Errror while creating the post",error)
//     })


// }
module.exports.create =async function(req , res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
       if(post){
           return res.redirect('back');
       }else{
        console.log("error in creating post");
        return;
       }
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
   
}    