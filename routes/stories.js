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
        res.render("/error/500")
    }
})
//  edit stories route
router.get("/edit/:id", ensureAuth , async (req, res)=>{
   const story = await stories.findOne({_id : req.params.id}).lean()

   if(!story){
    res.render("error/404")
   }
   if(story.user != req.user.id){
       res.render('/stories')
   }else{
       res.render("stories/edit", {
           story
       })
   }
})

// Update Stories
// PUT /stories/id

router.put("/:id", ensureAuth, async (req, res)=>{
    let story = await stories.findById(req.params.id).lean();
    if(!story){
        res.render("error/404")
    }
    if(story.user != req.user.id){
        res.render('error/500')
    }else{
        story = await stories.findOneAndUpdate({_id : req.params.id } ,req.body, {
            new : true,
            runValidators : true
        })
        res.redirect("/dashboard")
    }
})

router.get("/delete/:id", ensureAuth, async (req, res)=>{
    try{
            await stories.remove({_id :req.params.id}).lean()
            res.redirect("/dashboard")
    }catch(err){
        console.log(err)
        res.render("error/500")
    }
})
router.get("/:id", ensureAuth, async (req, res)=>{
        try{
            let story = await stories.findById(req.params.id)
            .populate("user")
            .lean()
            if(!story){
                res.render("error/404")
            }
            res.render("stories/diary", {
                story
            })
        }catch(err){
            console.log(err)
            res.render("error/500")
        }
})
module.exports = router;