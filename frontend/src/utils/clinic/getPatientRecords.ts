import { doc, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { StoredPatientRecord, Collections } from "../../types";

export const getPatientRecords = async (
    clinicId: string,
    patientId: string
): Promise<StoredPatientRecord[]> => {
    const clinicRef = doc(db, Collections.Clinic, clinicId);
    const patientsCollectionRef = collection(clinicRef, Collections.Patients);
    const patientDocRef = doc(patientsCollectionRef, patientId);
    const recordsCollectionRef = collection(patientDocRef, Collections.Records);

    const recordsSnapshot = await getDocs(recordsCollectionRef);
    const records: StoredPatientRecord[] = recordsSnapshot.docs.map((doc) => {
        const data = doc.data() as StoredPatientRecord;
        return data;
    });

    return records;
};
