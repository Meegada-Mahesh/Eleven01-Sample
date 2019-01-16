const express = require("express");
const router = express.Router();
const path = require("path")
const fs = require("fs");
// Compiling Solidity files using solc module
const solc = require("solc");
const simple = path.resolve(__dirname,'./../contracts','SimpleStorage.sol');
const source = fs.readFileSync(simple,'UTF-8');
const SimpleCompile = solc.compile(source,1).contracts[':SimpleStorage'];
const bytecode = SimpleCompile.bytecode;
const abi = JSON.parse(SimpleCompile.interface);


console.log(solc.compile(source,1))
console.log("Bytecode is  ",bytecode);
console.log("Abi is ",abi)


// Web3 js connection to RPC and setting web3 as provider
const Web3 = require("web3");
const RPC_ENDPOINT = "http://40.83.215.160:8083/api/node/rpc";
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const web3 = new Web3(provider);
const Simple = new web3.eth.Contract(abi)
const password = "mahesh"
var allAccounts;

var cAddress = "0x2BF8d72c0a8671Eaa515EC8A3c6056a13A044410" ;

//var SimpleStorageInstance = Simple.at(cAddress);

// var value = SimpleStorageInstance.get().call();
// console.log("value of get is: ",value);

var byte1 = '0x' + bytecode;

web3.eth.getAccounts().then(accounts => {

    accounts.forEach(account => {
  
      console.log("Total Accounts are",account)
  
    })
});

// Deployment Code

// web3.eth.getAccounts().then(accounts => {

// web3.eth.personal.unlockAccount(accounts[0],password,1000).then(result=>{
//     console.log("Account unlocked : ",result)
//     Simple.deploy({data:byte1}).send({
//         from:accounts[0],
//         gas:4700000,
//         gasPrice:0
//     }).on('receipt',receipt=>{
//         Simple.options.address = receipt.contractAddress;
//         console.log("Receipt of deployed contract is ",receipt);     
//     }).catch(console.error())
// }).catch(console.error())
  
// });


router.get("/dashboard",function(req,res){
    res.render("landing.ejs")
})

router.get("/balance",function(req,res){
    res.render("balance",{balance:""})
})

router.post("/balance",function(req,res){
    web3.eth.getAccounts().then(accounts => {
        allAccounts = accounts;
        web3.eth.getBalance(accounts[0]).then(balance =>{
            console.log("Balance of account is : ",balance);
            res.render("balance",{balance:balance})
    }).catch(console.log("Some error in retrieving balance"))
})
})

router.get("/func",function(req,res){
    res.render("func.ejs",{getResult:"",setResult:"",set:""});
})

router.post('/get',function(req,res){
    web3.eth.getAccounts().then(accounts=>{
        allAccounts = accounts;
        var byte1 = '0x' + bytecode;
        console.log("Account i am using: ",accounts[0]);
        web3.eth.personal.unlockAccount(accounts[0],password,1000).then(result=>{
            console.log("Account unlocked : ",result)
            Simple.options.address = cAddress;
            Simple.methods.get().call({from:accounts[0]}).then(result=>{
                console.log("Result from get function is ",result);
                res.render("func",{set:"",getResult:result,setResult:""})
            }).catch(console.error());
        }).catch(console.error())        
    }).catch(console.error())
})

router.post('/set',function(req,res){
    web3.eth.getAccounts().then(accounts=>{
        allAccounts = accounts;
        var byte1 = '0x' + bytecode;
        var set = req.body.set;
        console.log(set);
        console.log("Account i am using: ",accounts[0]);
        web3.eth.personal.unlockAccount(accounts[0],password,1000).then(result=>{
            console.log("Account unlocked : ",result)
            Simple.options.address = cAddress;
            Simple.methods.set(set).send({from:accounts[0]}).then(result=>{
                console.log("Result from set function is ",result);
                res.render("func",{set:set,setResult:result,getResult:""})
            }).catch(console.error());
        }).catch(console.error())        
    }).catch(console.error())
})


module.exports = router;