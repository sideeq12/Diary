const express = require("express");
const router = express.Router()
const { ensureAuth, ensureGuest } = require("../middleware/auth")

// our stories
const stories = require("../models/stories")
// Login to landing Page route
// GET /
router.get("/", ensureGuest ,(req, res)=>{
    res.render("login", {
        layout : "login"
    })
})

// Dashboard route
// GET /
router.get("/dashboard", ensureAuth , async (req, res)=>{
    try{
            const story = await stories.find({user : req.user.id}).lean()
            res.render("dashboard",{
                name : req.user.firstName,
                story
            })
    }catch(err){
        console.log(err)
    }
    
})

module.exports = router;
