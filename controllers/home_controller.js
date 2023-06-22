const Post = require('../models/posts')
const user = require('../models/user')
module.exports.home = async function(req,res){
    // console.log(req.cookies)
    // res.cookie('user_id',35) 
    // Post.find({

    // }).then((posts)=>{
    //     return res.render('home',{
    //         title:'Codial | Home',
    //         posts:posts
            
    //     })
    // }).catch((error)=>{
    //     console.log("error in fetcing posts",error)

    // })
    // Post.find({}).populate('user').then(
    //     (posts)=>{
    //         console.log("this is post",posts)
    //         res.render('home',{
    //           title: 'Codial | Home',
    //           posts:posts,
              
    //         })
    //     }
    // )
    let post=await Post.find({}).populate('user')
    console.log("Post",post)
    return res.render('home',{
        title: 'Codial | Home',
        posts: post
    })
  
}