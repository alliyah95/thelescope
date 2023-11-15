import { doc, addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { StoredPatientRecord, Collections } from "../../types";

export const createRecord = async (
    clinicId: string,
    patientId: string,
    record: StoredPatientRecord
) => {
    const clinicRef = doc(db, Collections.Clinic, clinicId);
    const patientsCollectionRef = collection(clinicRef, Collections.Patients);
    const patientDocRef = doc(patientsCollectionRef, patientId);
    const recordsCollectionRef = collection(patientDocRef, Collections.Records);
    return addDoc(recordsCollectionRef, record);
};
