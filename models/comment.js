const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,


    },
    // Comments belong to a user:
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    
}, {
    timestamps:true
    
}

    

)
const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;