const express = require ('express')
const app = express();
const port = 3000;
const expressLayouts=require('express-ejs-layouts') 
app.use(expressLayouts);
// use express router
app.use('/', require('./routes/index'))
// set up the view engine
app.set('view engine','ejs')
app.set('views','./views')


app.listen(port,(error)=>{
    if(error){
        console.log(error);
    }
    console.log("The server is up and running on port ", port)
})