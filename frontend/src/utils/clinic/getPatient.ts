import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
    Collections,
    RetrievedPatientDocument,
    PatientDocument,
} from "../../types";

export const getPatient = async (clinicId: string, customId: string) => {
    const patientsCollectionRef = collection(
        db,
        Collections.Clinic,
        clinicId,
        Collections.Patients
    );

    const patientsQuery = query(
        patientsCollectionRef,
        where("customId", "==", customId)
    );

    const patients = await getDocs(patientsQuery);
    const parsedPatientData: RetrievedPatientDocument[] = patients.docs.map(
        (doc) => ({
            ...(doc.data() as PatientDocument),
            id: doc.id,
        })
    );

    if (parsedPatientData.length === 1) {
        return parsedPatientData[0];
    } else {
        return null;
    }
};
