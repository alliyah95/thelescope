import { doc, updateDoc } from "firebase/firestore";
import { Collections } from "../../types";
import { db } from "../../config/firebase";

export const updateContractAddress = (
    clinicId: string,
    contractAddress: string
) => {
    const clinicDoc = doc(db, Collections.Clinic, clinicId);
    return updateDoc(clinicDoc, { contractAddress });
};
