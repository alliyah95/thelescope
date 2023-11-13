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
        recordId: "aabbccdd",
        operation: "CREATE",
        performedBy: "jake",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
    },
    2: {
        id: "hijkl",
        recordId: "eeffgg",
        operation: "UPDATE",
        performedBy: "jaeyun",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
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
    it("marks admin as an allowed viewer and creator", async () => {
        const isAllowedCreator = await transactionManager.methods
            .allowedTransactionCreators(accounts[0])
            .call();
        const isAllowedViewer = await transactionManager.methods
            .allowedTransactionViewers(accounts[0])
            .call();

        assert.equal(isAllowedCreator, true);
        assert.equal(isAllowedViewer, true);
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
    it("adds a transaction creator", async () => {
        const newCreator = accounts[1];
        await transactionManager.methods
            .addAllowedTransactionCreator(newCreator)
            .send({ from: accounts[0] });
        const isNewCreatorAllowed = await transactionManager.methods
            .allowedTransactionCreators(newCreator)
            .call();
        assert(isNewCreatorAllowed, true);
    });
    it("removes a transaction creator", async () => {
        const creatorToRemove = accounts[1];
        await transactionManager.methods
            .addAllowedTransactionCreator(creatorToRemove)
            .send({ from: accounts[0] });
        await transactionManager.methods
            .removeAllowedTransactionCreator(creatorToRemove)
            .send({ from: accounts[0] });
        const isCreatorRemoved = await transactionManager.methods
            .allowedTransactionCreators(creatorToRemove)
            .call();
        assert.equal(isCreatorRemoved, false);
    });
    it("adds a transaction viewer", async () => {
        const newViewer = accounts[1];
        await transactionManager.methods
            .addAllowedTransactionViewer(newViewer)
            .send({ from: accounts[0] });
        const isNewViewerAllowed = await transactionManager.methods
            .allowedTransactionViewers(newViewer)
            .call();
        assert(isNewViewerAllowed, true);
    });
    it("removes a transaction viewer", async () => {
        const viewerToRemove = accounts[1];
        await transactionManager.methods
            .addAllowedTransactionViewer(viewerToRemove)
            .send({ from: accounts[0] });
        await transactionManager.methods
            .removeAllowedTransactionViewer(viewerToRemove)
            .send({ from: accounts[0] });
        const isViewerRemoved = await transactionManager.methods
            .allowedTransactionViewers(viewerToRemove)
            .call();
        assert.equal(isViewerRemoved, false);
    });
    it("successfully creates a transaction", async () => {
        const initialTransactionCount = await transactionManager.methods
            .getTransactionCount()
            .call({ from: accounts[0] });
        const tx = sampleTransactions[1];
        await transactionManager.methods
            .createTransaction(
                tx.id,
                tx.recordId,
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
    it("reverts when creating a transaction with an invalid operation", async () => {
        try {
            const initialTransactionCount = await transactionManager.methods
                .getTransactionCount()
                .call({ from: accounts[0] });
            const tx = invalidTransactions[1];
            await transactionManager.methods
                .createTransaction(
                    tx.id,
                    tx.recordId,
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
            assert(false);
        } catch (err) {
            assert(err);
        }
    });
    it("returns all transactions", async () => {
        const initialTransactionCount = await transactionManager.methods
            .getTransactionCount()
            .call({ from: accounts[0] });
        const tx1 = sampleTransactions[1];
        await transactionManager.methods
            .createTransaction(
                tx1.id,
                tx1.recordId,
                tx1.operation,
                tx1.performedBy,
                tx1.description
            )
            .send({ from: accounts[0], gas: "5000000" });
        const tx2 = sampleTransactions[2];
        await transactionManager.methods
            .createTransaction(
                tx2.id,
                tx2.recordId,
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
