const Comment = require('../models/comment')
const Post = require('../models/post')
module.exports.create=function(req,res){
    Post.findById(req.body.post).then((post)=>{
        console.log(post)
        if(post){
            console.log(req.body.post)
            Comment.create({
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
// module.exports.destroy=function (req,res){
//     Comment.findById(req.params.id).then((comment)=>{
//         console.log(comment)
//         if(comment.user==req.user.id){

//             let postId=comment.post
//             comment.deleteOne();
//             Post.findByIdAndUpdate(postId , {$pull:{comments:req.params.id}
//             },(req,res)=>{
//                 res.redirect('back')
//             })
//         }

//     })
// }

module.exports.destroy= async function(req,res)
{
    try {
        let comment= await  Comment.findById(req.params.id);
        console.log('comment', comment)

        if(comment.user== req.user.id)
        {
            let postId=comment.post;
            comment.deleteOne();

             //removing that comment from post as well as in comment array which is present in array list of post
            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // deleting the likes

            


            

            //removing that comment from post as well as in comment array which is present in array list of post

        //    await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            req.flash('success','Comment got deleted successfully')
           return res.redirect("back");
        }

    } catch (error) {

        // req.flash("error", "error");
        console.log('error :',error)
        return res.send("back");
        // console.log("error ", error);
    }
   
}
