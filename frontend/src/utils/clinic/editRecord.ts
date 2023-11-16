import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { StoredPatientRecord, Collections } from "../../types";

export const editRecord = async (
    clinicId: string,
    patientId: string,
    recordId: string,
    updatedRecord: Partial<StoredPatientRecord>
) => {
    const recordDocRef = doc(
        db,
        Collections.Clinic,
        clinicId,
        Collections.Patients,
        patientId,
        Collections.Records,
        recordId
    );
    return setDoc(recordDocRef, updatedRecord, { merge: true });
};
