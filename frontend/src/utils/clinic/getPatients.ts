import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
    Collections,
    RetrievedPatientDocument,
    PatientDocument,
} from "../../types";

export const getPatients = async (clinicId: string) => {
    const patientsCollectionRef = collection(
        db,
        Collections.Clinic,
        clinicId,
        Collections.Patients
    );
    const patients = await getDocs(patientsCollectionRef);
    const parsedPatientData: RetrievedPatientDocument[] = patients.docs.map(
        (doc) => ({
            ...(doc.data() as PatientDocument),
            id: doc.id,
        })
    );
    const sortedPatients = parsedPatientData.sort((a, b) =>
        a.lastName.localeCompare(b.lastName)
    );
    return sortedPatients;
};
