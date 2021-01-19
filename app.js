"use-strict"

const bodyParser = require("body-parser")
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const methodOverride = require("method-override")
const morgan = require("morgan")
const exphbs = require("express-handlebars")
const passport = require("passport")
const mongoose = require("mongoose")
const session = require("express-session");
const  MongoStore  = require("connect-mongo")(session);

// loading config file

dotenv.config({path : "./config/.env"})

// passport invoke
require("./config/passport")(passport)

connectDB()

const app = express();

// static folder
app.use(express.static("public"))
// using Body parser to pass the post request content
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Method Override Middleware
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))

// script tag
const {truncate, stripTags, editIcon } = require("./helpers/hbs")


// declaring handlebars middleware
app.engine('.hbs', exphbs({helpers : {
    truncate,
    stripTags,
    editIcon
},
defaultLayout : 'main', extname: '.hbs'}))
app.set('view engine', '.hbs');

// declaring session
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : false,
    store : new MongoStore({ mongooseConnection : mongoose.connection})
}))

app.use(passport.initialize())
app.use(passport.session())
// Routes

//setting global variable
app.use(function(req, res , next){
    res.locals.user = req.user || null
    next()
}) 


app.use("/", require("./routes/index"))
app.use("/auth", require("./routes/auth"))
app.use("/stories", require("./routes/stories"))


app.listen(process.env.PORT || 300, ()=>{
    console.log("Server running on Port 3000")
})