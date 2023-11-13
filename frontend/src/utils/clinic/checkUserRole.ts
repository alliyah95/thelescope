import { collection, query, where, getDocs } from "firebase/firestore";
import { Collections } from "../../types";
import { db } from "../../config/firebase";

export const checkUserRole = async (userId: string) => {
    const usersCollectionRef = collection(db, Collections.ClinicMembers);

    const q = query(usersCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const isAdmin = userData.isAdmin;
            return isAdmin;
        });
    } else {
        console.log("No user found with the specified ID.");
    }
};
