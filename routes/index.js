const express = require("express");
const router = express.Router()


// Login to landing Page route
// GET /
router.get("/", (req, res)=>{
    res.render("login")
})

// Dashboard route
// GET /
router.get("/dashboard", (req, res)=>{
    res.render("dashboard")
})

module.exports = router;
