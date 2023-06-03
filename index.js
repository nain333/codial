const express = require ('express')
const app = express();
const port = 3000;
// use express router
app.use('/', require('./routes/index'))


app.listen(port,(error)=>{
    if(error){
        console.log(error);
    }
    console.log("The server is up and running on port ", port)
})