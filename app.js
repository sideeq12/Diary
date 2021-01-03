"use-strict"

const bodyParser = require("body-parser")
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
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

// declaring handlebars middleware
app.engine('.hbs', exphbs({ defaultLayout : 'main', extname: '.hbs'}))
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
app.use("/", require("./routes/index"))
app.use("/auth", require("./routes/auth"))
app.use("/stories", require("./routes/stories"))



PORT = process.env.PORT || 300
app.listen(PORT, ()=>{
    console.log(`Server running on Port ${PORT}`)
})