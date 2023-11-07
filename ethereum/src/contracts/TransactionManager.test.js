const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());

const compiledContract = require("../build/TransactionManager.json");

let accounts;
let transactionManager;
let sampleClinicName = "Ocampo Eye and Skin Clinic";
let sampleClinicId = "123456789";

beforeEach(async () => {
    // fetch accounts from ganache
    accounts = await web3.eth.getAccounts();

    // deploy the contract
    transactionManager = await new web3.eth.Contract(
        JSON.parse(compiledContract.interface)
    )
        .deploy({
            data: compiledContract.bytecode,
            arguments: [sampleClinicName, sampleClinicId],
        })
        .send({ gas: "1000000", from: accounts[0] });
});

describe("TransactionManager", () => {
    it("deploys the contract", () => {
        assert.ok(transactionManager.options.address);
    });
    it("marks constructor caller as the admin", async () => {
        const admin = await transactionManager.methods.admin().call();
        assert.equal(admin, accounts[0]);
    });
    it("sets the clinic name", async () => {
        const clinicName = await transactionManager.methods.clinicName().call();
        assert.equal(clinicName, sampleClinicName);
    });
    it("sets the clinic ID", async () => {
        const clinicId = await transactionManager.methods.clinicId().call();
        assert.equal(clinicId, sampleClinicId);
    });
    it("initializes transactions as an empty array upon deployment - using getTransactionCount", async () => {
        const transactionsCount = await transactionManager.methods
            .getTransactionCount()
            .call();
        assert.equal(transactionsCount, 0);
    });
    it("initializes transactions as an empty array upon deployment - using getAllTransactions", async () => {
        const transactions = await transactionManager.methods
            .getAllTransactions()
            .call();
        assert.equal(transactions.length, 0);
    });
});
