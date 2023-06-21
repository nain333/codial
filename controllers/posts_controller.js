const Post = require('../models/posts')
module.exports.create=(req,res)=>{
    Post.create({
        content:req.body.content,
        user: req.user._id
    }
    ).then(()=>{
        res.redirect('back')
    }).catch(
        (error)=>{
            console.log('Error in creating the Post ',error)
        }
    )


}