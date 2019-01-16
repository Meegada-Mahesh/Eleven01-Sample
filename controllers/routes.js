const express = require("express");
const router = express.Router();


router.get("/dashboard",function(req,res){
    res.render("landing.ejs")
})

router.get("/balance",function(req,res){
    res.render("balance.ejs");
})


module.exports = router;