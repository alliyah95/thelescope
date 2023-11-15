import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Collections } from "../../types";

export const deletePatientDoc = async (clinicId: string, patientId: string) => {
    const patientDocRef = doc(
        db,
        Collections.Clinic,
        clinicId,
        Collections.Patients,
        patientId
    );
    return deleteDoc(patientDocRef);
};
