const comment = require('../models/comment')
const post = require('../models/post')
module.exports.create=function(req,res){
    post.findById(req.body.post).then((post)=>{
        console.log(post)
        if(post){
            console.log(req.body.post)
            comment.create({
                content:req.body.content,
                post:   req.body.post,
                user:   req.user._id
                
            }).then((comment)=>{
                console.log(comment)
                // handle the error
                // Adding comment to the post
                post.comments.push(comment);
                post.save();
                res.redirect('/')


            })
        }
    })

}
module.exports.destroy