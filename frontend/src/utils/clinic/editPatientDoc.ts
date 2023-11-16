import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { PatientDocument, Collections } from "../../types";

export const editPatientDoc = async (
    clinicId: string,
    patientId: string,
    updatedPatient: Partial<PatientDocument>
) => {
    const patientDocRef = doc(
        db,
        Collections.Clinic,
        clinicId,
        Collections.Patients,
        patientId
    );
    return setDoc(patientDocRef, updatedPatient, { merge: true });
};
