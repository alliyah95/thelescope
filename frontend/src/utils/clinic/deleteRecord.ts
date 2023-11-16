import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Collections } from "../../types";

export const deleteRecord = (
    clinicId: string,
    patientId: string,
    recordId: string
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
    return deleteDoc(recordDocRef);
};
