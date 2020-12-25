"use-strict"
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const morgan = require("morgan")
const exphbs = require("express-handlebars")


// loading config file

dotenv.config({path : "./config/config.env"})

connectDB()

const app = express();

// declaring handlebars middleware
app.engine('.hbs', exphbs({defaultLayout : "main", extname: '.hbs'}));
app.set('view engine', '.hbs');

// Routes
app.use("/", require("./routes/index"))



PORT = process.env.PORT || 300
app.listen(PORT, ()=>{
    console.log(`Server running on Port ${PORT}`)
})