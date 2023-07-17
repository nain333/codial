const user = require('../../../models/user')
const Post = require('../../../models/post')
const Comment = require('../../../models/comment')
module.exports.index = async function(req,res){
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    
    .populate({ 
         path:'comments',
         populate: {
             path:  'user'
         }

    })
    return res.json(200,{
        message:'List of posts',
        posts:posts
    })

}
module.exports.destroy=async function(req,res){
    try {
        console.log("Hello")
        let post=await Post.findById(req.params.id);
        // console.log(post.user)
        
         if(post.user==req.user.id){
            post.deleteOne();

            Comment.deleteMany({
                post:req.params.id
             })
           
            // req.flash('success','post got deleted along with all associated comments')
            
            return res.status(200).json({
                massage:'Post got deleted with all associated comments'
            })
         }
         else{
        //     req.flash('error',"you can't delete the post")
             return res.status(401).json({
                message:"you can't delete the post"
             })
            
         }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Internal server Error'
        })
    }
    
}