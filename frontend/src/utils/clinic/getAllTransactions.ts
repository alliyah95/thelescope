import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";
import { StoredTransaction, Collections } from "../../types";

export const getAllTransactions = async (clinicId: string) => {
    const transactionsCollectionRef = collection(
        db,
        Collections.Clinic,
        clinicId,
        Collections.Transactions
    );

    const transactionsQuery = query(
        transactionsCollectionRef,
        orderBy("timestamp", "desc")
    );

    const transactionsSnapshot = await getDocs(transactionsQuery);
    const transactions: StoredTransaction[] = [];

    transactionsSnapshot.forEach((doc) => {
        const data = doc.data();
        const transaction: StoredTransaction = {
            customId: data.customId,
            operation: data.operation,
            performedBy: data.performedBy,
            description: data.description,
            involvedData: data.involvedData,
            involvedDataId: data.involvedDataId,
            timestamp: data.timestamp,
            transactionHash: data.transactionHash,
        };

        transactions.push(transaction);
    });

    return transactions;
};
