

module.exports.index=(req,res)=>{
    return res.status(200).json({
        data:{
            postsList:[]
        },
        timeStamps:true
        
    }                                       )

}