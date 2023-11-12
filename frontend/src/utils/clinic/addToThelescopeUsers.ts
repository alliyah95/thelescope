import { Collections, ThelescopeUser } from "../../types";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";

export const addToThelescopeUsers = (user: ThelescopeUser) => {
    const usersRef = collection(db, Collections.ThelescopeUsers);
    return addDoc(usersRef, user);
};
