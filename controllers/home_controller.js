const Post = require('../models/posts')
module.exports.home = function(req,res){
    // console.log(req.cookies)
    // res.cookie('user_id',35) 
    Post.find({

    }).then((posts)=>{
        return res.render('home',{
            title:'Codial | Home',
            posts:posts
            
        })
    }).catch((error)=>{
        console.log("error in fetcing posts",error)

    })
    
}