const express = require("express");
const { ensureAuth } = require("../middleware/auth");
const router = express.Router();

// Stories get /add/stories
router.get("/add", ensureAuth, (req, res)=>{
    res.render("stories/add")
})
router.post("/", ensureAuth, async (req, res)=>{
    try{
      req.body.user = req.body.id
      await Story.create(req.body)  
      res.redirect("/dashboard")
    }catch(err){
        console.log(err)
        res.render("error/500")
    }

})
module.exports = router;