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
const output = solc.compile(source, 1).contracts[`:${CONTRACT}`];

// recreate the build folder
fs.ensureDirSync(buildPath);

// output the contract
const contractFileName = `${CONTRACT}.json`;
fs.outputJSONSync(path.resolve(buildPath, contractFileName), output);
