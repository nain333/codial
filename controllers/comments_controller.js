const Comment = require('../models/comment')
const Post = require('../models/post')
const commentsMailer=require('../mailers/comments_mailer')
module.exports.create=async function(req,res){
    let post = await Post.findById(req.body.post)
    console.log('post: ',post)
    if(post){
        let comment = await Comment.create(
            {
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            }
            
        )
        post.comments.push(comment)
        post.save()
    
        comment=await comment.populate('user','name email');
        commentsMailer.newComment(comment);
        if(req.xhr){
            console.log('comment: ',comment)
        

        req.flash('sucess',' Comment got published! ')
        res.status(200).json({
            data:{
                comment:comment

            },
            message:"Comment created!"
        })

        }


        
        

    }
    
    
    

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
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:comment,

                    },
                    message:'comment deleted successfuly'
                })

            }

            // deleting the likes

            


            

            //removing that comment from post as well as in comment array which is present in array list of post

        //    await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            req.flash('success','Comment got deleted successfully')
           return res.redirect("back");
        }

    } catch (error) {

        // req.flash("error", "error");
        console.log('error :',error)
        return res.redirect("back");
        // console.log("error ", error);
    }
   
}
