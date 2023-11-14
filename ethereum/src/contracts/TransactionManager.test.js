const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());

const compiledContract = require("../build/TransactionManager.json");

let accounts;
let transactionManager;
let sampleClinicName = "Ocampo Eye and Skin Clinic";
let sampleClinicId = "123456789";

const sampleTransactions = {
    1: {
        id: "abcdefg",
        involvedData: "Patient",
        involvedDataId: "123456789",
        operation: "CREATE",
        performedBy: "Jake",
        description: "Created a new patient",
    },
    2: {
        id: "hijklm",
        involvedData: "Record",
        involvedDataId: "987654321",
        operation: "UPDATE",
        performedBy: "Jaeyun",
        description: "Updated a patient record",
    },
};

const invalidTransactions = {
    1: {
        id: "mnopqr",
        recordId: "hhiijj",
        operation: "invalid operation",
        performedBy: "niall",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
    },
};

beforeEach(async () => {
    // fetch accounts from ganache
    accounts = await web3.eth.getAccounts();

    // deploy the contract
    transactionManager = await new web3.eth.Contract(compiledContract.abi)
        .deploy({
            data: compiledContract.evm.bytecode.object,
            arguments: [sampleClinicName, sampleClinicId],
        })
        .send({ gas: "5000000", from: accounts[0] });
});

describe("TransactionManager", () => {
    it("deploys the contract", () => {
        assert.ok(transactionManager.options.address);
    });
    it("marks constructor caller as the admin", async () => {
        const admin = await transactionManager.methods.clinicAdmin().call();
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
            .call({ from: accounts[0] });
        assert.equal(transactionsCount, 0);
    });
    it("successfully creates a transaction", async () => {
        const initialTransactionCount = await transactionManager.methods
            .getTransactionCount()
            .call({ from: accounts[0] });
        const tx = sampleTransactions[1];
        await transactionManager.methods
            .createTransaction(
                tx.id,
                tx.involvedData,
                tx.involvedDataId,
                tx.operation,
                tx.performedBy,
                tx.description
            )
            .send({ from: accounts[0], gas: "5000000" });
        const newTransactionCount = await transactionManager.methods
            .getTransactionCount()
            .call({ from: accounts[0] });
        assert.equal(
            Number(initialTransactionCount) + 1,
            Number(newTransactionCount)
        );
    });
    it("returns all transactions", async () => {
        const initialTransactionCount = await transactionManager.methods
            .getTransactionCount()
            .call({ from: accounts[0] });
        const tx1 = sampleTransactions[1];
        await transactionManager.methods
            .createTransaction(
                tx1.id,
                tx1.involvedData,
                tx1.involvedDataId,
                tx1.operation,
                tx1.performedBy,
                tx1.description
            )
            .send({ from: accounts[0], gas: "5000000" });
        const tx2 = sampleTransactions[2];
        await transactionManager.methods
            .createTransaction(
                tx2.id,
                tx2.involvedData,
                tx2.involvedDataId,
                tx2.operation,
                tx2.performedBy,
                tx2.description
            )
            .send({ from: accounts[0], gas: "5000000" });
        const newTransactionCount = await transactionManager.methods
            .getTransactionCount()
            .call({ from: accounts[0] });
        const transactions = await Promise.all(
            Array.from({ length: Number(newTransactionCount) }, (_, index) => {
                return transactionManager.methods.transactions(index).call();
            })
        );
        const ids = transactions.map((transaction, index) => {
            return transaction.id === sampleTransactions[index + 1].id;
        });

        assert.strictEqual(
            ids.every((id) => id === true),
            true
        );
        assert.equal(
            Number(initialTransactionCount) + 2,
            Number(newTransactionCount)
        );
    });
});
