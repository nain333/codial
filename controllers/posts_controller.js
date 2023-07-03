const Post = require('../models/post')
const Comment = require('../models/comment')

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
// module.exports.distroy= (req,res)=>{
//     Post.findById(req.params.id).then((post)=>{
//         if(post.user==req.user.id){
//             post.deleteOne({post:req.params.id}).then(()=>res.redirect('/')).catch((error)=>console.log("Error in deleting the post: ",error))
//         }
//     })
// }
module.exports.destroy=async function(req,res){
    try {
        let post=await Post.findById(req.params.id);
        
        if(post.user==req.user.id){
            post.deleteOne();
            Comment.deleteMany({
                post:req.params.id
            })
            
            return res.redirect('/')
        }
        else{
            return res.redirect('/')
        }
    } catch (error) {
        console.log(error);
    }
    
}