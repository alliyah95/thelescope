import {
    doc,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { Collections } from "../../types";
import { db } from "../../config/firebase";

export const updateUserContract = async (
    userId: string,
    contractAddress: string
) => {
    const usersRef = collection(db, Collections.ThelescopeUsers);
    const q = query(usersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const firstDocument = querySnapshot.docs[0];
        const usersDocRef = doc(usersRef, firstDocument.id);
        localStorage.setItem("clinicContract", `${contractAddress}`);
        return updateDoc(usersDocRef, { clinicContract: contractAddress });
    }
};
