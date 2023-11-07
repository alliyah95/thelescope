require("dotenv").config();
const { Web3 } = require("web3");

let web3;
console.log(process.env.INFURA_API);
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
} else {
    const provider = new Web3.providers.HttpProvider(process.env.INFURA_API);
    web3 = new Web3(provider);
}

module.exports = { web3 };