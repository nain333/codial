const nodemailer=require('../config/nodemailer')
// another way of exporting a method
exports.newComment=(comment)=>{
    console.log('inside new comment mailer',comment)
    nodemailer.transporter.sendMail({
        from:'admin@codial.com',
        to: comment.user.email,
        subject:"New comment published!",
        html:'<h1>Yup, your comment is now published</h1>'
    },(err,info)=>{
        if(err){
            console.log('error in sending mail: ',err)
            return
        }
        console.log('Mail sent successfully ',info)
        return

    })

}