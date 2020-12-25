const express = require("express");
const router = express.Router()


// Login to landing Page route
// GET /
router.get("/", (req, res)=>{
    res.send("Login")
})

// Dashboard route
// GET /
router.get("/dashboard", (req, res)=>{
    res.send("Dasboard")
})

module.exports = router;
