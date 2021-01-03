const express = require("express");
const { ensureAuth } = require("../middleware/auth");
const stories = require("../models/stories");
const router = express.Router();

// Stories get /add/stories
router.get("/add", ensureAuth, (req, res)=>{
    res.render("stories/add")
})
router.post("/", ensureAuth, async (req, res)=>{
    try{
      req.body.user = req.user.id
      await stories.create(req.body)
      res.redirect("/dashboard")
    }catch(err){
        console.log(err)
        res.render("error/500")
    }
})
router.get("/", ensureAuth, async (req, res)=>{
    try{
        const Stories = await stories.find({status : "Public"})
        .populate("user")
        .lean()
        res.render("stories/index", {
            Stories
        })
    }catch(err){
        console.log(err)
        res.render("error/500")
    }
})
module.exports = router;