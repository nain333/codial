const express = require ('express')
const app = express();
const port = 3400;
app.listen(port,(error)=>{
    if(error){
        console.log(error);
    }
    console.log("The server is up and running on port ", port)
})