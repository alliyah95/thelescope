const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// contract name
const CONTRACT = "TransactionManager";

// get the directory of the build folder
const buildPath = path.resolve(__dirname, "build");

// delete the build folder
fs.removeSync(buildPath);

// get the directory of the TransactionManager contract
const transactionManagerPath = path.resolve(
    __dirname,
    "contracts",
    `${CONTRACT}.sol`
);
const source = fs.readFileSync(transactionManagerPath, "utf8");

// compile the contract
const input = {
    language: "Solidity",
    sources: {
        "TransactionManager.sol": {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    "TransactionManager.sol"
];

// recreate the build folder
fs.ensureDirSync(buildPath);

// create file
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(":", "") + ".json"),
        output[contract]
    );
}
