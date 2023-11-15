import React from "react";
import { StoredTransaction, TransactionOperation } from "../../types";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DescriptionIcon from "@mui/icons-material/Description";

export interface TransactionCardProps {
    transactionInfo: StoredTransaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
    transactionInfo,
}) => {
    const operationClasses =
        transactionInfo.operation === "Create"
            ? "text-green-600"
            : transactionInfo.operation === "Delete"
            ? "text-red-500"
            : "text-blue-500";
    const { seconds, nanoseconds } = transactionInfo.timestamp;
    const formattedTimestamp = new Date(seconds * 1000 + nanoseconds / 1000000);

    return (
        <div className="bg-white rounded-lg p-8 items-center text-ths-black">
            <p>
                <span className="font-bold">Operation:</span>{" "}
                <span className={`${operationClasses}`}>
                    {transactionInfo.operation.toUpperCase()}
                </span>
            </p>
            <p>
                <span className="font-bold">Description:</span>{" "}
                {transactionInfo.description}
            </p>

            <p>
                <span className="font-bold">Performed by:</span>{" "}
                {transactionInfo.performedBy}
            </p>
            <p>
                <span className="font-bold">Timestamp:</span>{" "}
                {formattedTimestamp.toLocaleString()}
            </p>

            <div className="flex gap-8 text-center mt-8">
                <a
                    className="btn"
                    href={`https://sepolia.etherscan.io/address/${transactionInfo.transactionHash}`}
                    target="_blank"
                >
                    <div className="flex gap-2 items-center justify-center">
                        <AccountBalanceWalletIcon className="!h-5" />
                        <span>View on Etherscan</span>
                    </div>
                </a>
                <a
                    className="btn"
                    href={`https://sepolia.etherscan.io/address/${transactionInfo.transactionHash}`}
                    target="_blank"
                >
                    <div className="flex gap-2 items-center justify-center">
                        <DescriptionIcon className="!h-5" />
                        <span>View involved record</span>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default TransactionCard;
