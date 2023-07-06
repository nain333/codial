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
            populate: {
                path:  'user'
            }

       })
       User.find({}).then((users)=>{
        return res.render('home', {
            title: "Home",
            posts:  posts,
            all_users:users
        });


       }).catch((error)=>console.log("Error fetching users",error))
       
       

       

   }catch(err){
       console.log('Error', err);
       return;
   }
  
}
    
    

  
