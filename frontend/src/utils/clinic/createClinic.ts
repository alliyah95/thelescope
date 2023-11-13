import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Clinic, Collections } from "../../types";

export const createClinic = async (clinic: Clinic) => {
    const clinicRef = collection(db, Collections.Clinic);
    const docRef = (await addDoc(clinicRef, clinic)) as any;
    const newClinicId = docRef.id;
    return { clinicId: newClinicId, ...clinic };
};
