const express = require("express");
const ejs = require("ejs");
const solc = require("solc");
const Web3 = require("web3");
const bodyParser = require("body-parser");

const RPC_ENDPOINT = "40.83.215.160:8083/api/node/rpc";

const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);

const web3 = new Web3(provider);


app.set("view engine","ejs")
app.set("views",__dirname+"/views")


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


app.get('/',function(req,res){
    res.send("Default Route for dApp")
})


const app = express();

app.listen(8080);

console.log("Hello Guys server is running at port 8080");