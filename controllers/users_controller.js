module.exports.profile= (req,res)=>{
    res.render('profile',{
        title:'profile'
    })
}
module.exports.feeds=(req,res)=>{
    res.render('feeds',{
        title:'User feeds'
    })
}