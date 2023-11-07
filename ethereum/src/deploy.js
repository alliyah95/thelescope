require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledContract = require("./build/TransactionManager.json");

const metamaskSeedPhrase = process.env.METAMASK_SEED_PHRASE;
const infuraApi = process.env.INFURA_API;
const clinicName = process.env.CLINIC_NAME;
const clinicId = process.env.CLINIC_ID;

const provider = new HDWalletProvider(metamaskSeedPhrase, infuraApi);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy contract from account", accounts[0]);

    const result = await new web3.eth.Contract(
        JSON.parse(compiledContract.interface)
    )
        .deploy({
            data: compiledContract.bytecode,
            arguments: [clinicName, clinicId],
        })
        .send({ gas: "1000000", from: accounts[0] });

    console.log("Contract deployed to", result.options.address);
    provider.engine.stop();
};

deploy();
