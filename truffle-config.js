var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = 'hurdle special buzz depth ordinary ignore witness grief advice someone uniform fox';

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    eleven01: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "http://40.83.215.160:8083/api/node/rpc")
      },
      network_id: "*",
      gasPrice: 0,
      gas: 4700000,      //make sure this gas allocation isn't over 4M, which is the max
    }
  }
};
