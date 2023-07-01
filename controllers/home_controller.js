const Post = require('../models/post')
const User = require('../models/user')
module.exports.home =  async function(req,res){
    try{
        // populate the user of each post and likes also
       let posts = await Post.find({})
       .sort('-createdAt')
       .populate('user')
       .populate({ 
            path:'comments',

       })
       
       

       return res.render('home', {
           title: "Home",
           posts:  posts
       });

   }catch(err){
       console.log('Error', err);
       return;
   }
  
}
    
    

  
