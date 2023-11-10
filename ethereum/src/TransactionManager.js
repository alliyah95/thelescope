require("dotenv").config();
const { web3 } = require("./web3");
const compiledContract = require("./build/TransactionManager.json");

const address = process.env.CONTRACT_ADDRESS;
const instance = new web3.eth.Contract(compiledContract.abi, address);

module.exports = { instance };
