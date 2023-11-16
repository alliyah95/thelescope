import { doc, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
    RetrievedPatientRecord,
    StoredPatientRecord,
    Collections,
} from "../../types";

export const getPatientRecords = async (
    clinicId: string,
    patientId: string
): Promise<RetrievedPatientRecord[]> => {
    const clinicRef = doc(db, Collections.Clinic, clinicId);
    const patientsCollectionRef = collection(clinicRef, Collections.Patients);
    const patientDocRef = doc(patientsCollectionRef, patientId);
    const recordsCollectionRef = collection(patientDocRef, Collections.Records);

    const recordsSnapshot = await getDocs(recordsCollectionRef);
    const records: RetrievedPatientRecord[] = recordsSnapshot.docs.map(
        (doc) => {
            const data = doc.data() as StoredPatientRecord;
            return { ...data, id: doc.id };
        }
    );

    return records;
};
