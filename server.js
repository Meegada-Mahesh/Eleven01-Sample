const express = require("express");
const ejs = require("ejs");
const routing = require("./controllers/routes");
const bodyParser = require("body-parser");

// Core modules of nodejs to filesystem and path
const fs = require("fs");
const path = require("path")

// app engine
const app = express();



// Middlewares for to connect to nodejs and routing
app.set("view engine","ejs")
app.set("views",__dirname+"/views")
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use('/user',routing);


// Default route
app.get('/',function(req,res){
    res.send("Default Route for dApp")
})


app.listen(8080);
console.log("Hello Guys server is running at port 8080");