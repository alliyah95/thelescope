import { Collections, ClinicMember } from "../../types";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";

export const createUser = (user: ClinicMember) => {
    const usersCollectionRef = collection(db, Collections.ClinicMembers);
    return addDoc(usersCollectionRef, user);
};
