const express = require("express");
const router = express.Router()


// Login to landing Page route
// GET /
router.get("/", (req, res)=>{
    res.render("Login")
})

// Dashboard route
// GET /
router.get("/dashboard", (req, res)=>{
    res.rende("Dasboard")
})

module.exports = router;
