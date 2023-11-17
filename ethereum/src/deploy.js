require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledContract = require("./build/Transaction.json");

const metamaskSeedPhrase = process.env.METAMASK_SEED_PHRASE;
const infuraApi = process.env.INFURA_API;

const provider = new HDWalletProvider(metamaskSeedPhrase, infuraApi);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy contract from account", accounts[0]);

    const result = await new web3.eth.Contract(compiledContract.abi)
        .deploy({
            data: compiledContract.evm.bytecode.object,
            arguments: ["", "", "", "", "", ""],
        })
        .send({ gas: "5000000", from: accounts[0] });
    console.log("Contract deployed to", result.options.address);
    provider.engine.stop();
};

deploy();
