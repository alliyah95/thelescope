import { Collections, ClinicMember } from "../../types";
import { db } from "../../config/firebase";
import { addDoc, collection, doc } from "firebase/firestore";

export const createUser = (user: ClinicMember, clinicId: string) => {
    const clinicRef = doc(db, Collections.Clinic, clinicId);
    const membersRef = collection(clinicRef, Collections.ClinicMembers);
    return addDoc(membersRef, user);
};
