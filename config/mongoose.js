const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/codial-development-db')
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error while connecting to the db"));
db.once('open',()=>{
    console.log("Successfuly connected :: mongoDB")
})
module.exports=db;