import { getWeb3 } from "../../web3/utils";
import { TransactionContract } from "../../web3/abi";
import { Transaction, TransactionResult } from "../../types";

export const createTransaction = async (
    transaction: Transaction
): Promise<TransactionResult> => {
    const result = {
        transactionHash: "",
        status: "error",
    } as TransactionResult;

    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const transactionContract = new web3.eth.Contract(TransactionContract.abi);

    // deploy the contract
    const deployedContract = transactionContract.deploy({
        data: TransactionContract.evm.bytecode.object,
        arguments: [
            transaction.customId,
            transaction.involvedData,
            transaction.involvedDataId,
            transaction.operation,
            transaction.performedBy,
            transaction.description,
        ],
    });

    const sendTransaction = deployedContract.send({
        from: accounts[0],
        gas: "5000000",
    });

    const confirmationPromise = new Promise<void>((resolve, reject) => {
        sendTransaction
            .on("transactionHash", (hash: string) => {
                result.transactionHash = hash;
            })
            .on("confirmation", () => {
                result.status = "success";
                resolve();
            })
            .on("error", (error: any) => {
                result.status = "error";
                reject(error);
            });
    });

    try {
        await confirmationPromise;
    } catch (error) {
        throw error;
    }

    return result;
};
