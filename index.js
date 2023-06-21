const express = require ('express')
const app = express();
const port = 8000;
const cookieParser=require('cookie-parser')
const expressLayouts=require('express-ejs-layouts') 
const db = require('./config/mongoose')
const session = require('express-session')
const passport=require('passport')
const passportLocal = require('./config/passport-local-stratergy');
const MongoStore =  require('connect-mongo')(session);
const sassMiddleware=require("node-sass-middleware")


app.use(sassMiddleware({
    src: './assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
app.use(express.urlencoded())
// set up the cookie parser
app.use(cookieParser());
app.use(express.static('./assets'))                                                
app.use(expressLayouts);
// extract styles and scripts from subpages in layouts.
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)


// set up the view engine
app.set('view engine','ejs')
app.set('views','./views')
// mongoStore is used to store the session cookie in the db
app.use(session({
    name:'codial',
    // Todo change the secrate before deployment
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },store: new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },(errror)=>{
            console.log(error||'connect-mongodb setup ok')

        }
    )
}))
app.use(passport.initialize());
app.use(passport.session())
app.use(passport.setAuthenticatedUser)
                                                         
// use express router
app.use('/', require('./routes/index'))


app.listen(port,(error)=>{
    if(error){
        console.log(error);
    }
    console.log("The server is up and running on port ", port)
})
