import { doc, addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { PatientDocument, Collections } from "../../types";

export const createPatientDoc = (
    clinicId: string,
    patient: PatientDocument
) => {
    const clinicDocRef = doc(db, Collections.Clinic, clinicId);
    const patientsCollectionRef = collection(
        clinicDocRef,
        Collections.Patients
    );
    return addDoc(patientsCollectionRef, patient);
};
