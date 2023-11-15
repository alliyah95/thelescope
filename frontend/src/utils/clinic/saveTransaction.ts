import { doc, addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { StoredTransaction, Collections } from "../../types";

export const saveTransaction = async (
    clinicId: string,
    transaction: StoredTransaction
) => {
    const clinicDocRef = doc(db, Collections.Clinic, clinicId);
    const transactionsCollectionRef = collection(
        clinicDocRef,
        Collections.Transactions
    );
    return addDoc(transactionsCollectionRef, transaction);
};
