import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { ClinicMember, Collections } from "../../types";

export const getAllMembers = async (clinicId: string) => {
    const membersCollectionRef = collection(
        db,
        Collections.Clinic,
        clinicId,
        Collections.ClinicMembers
    );

    const membersSnapshot = await getDocs(membersCollectionRef);
    const members: ClinicMember[] = [];

    membersSnapshot.forEach((doc) => {
        const memberData = doc.data() as ClinicMember;
        members.push(memberData);
    });

    return members;
};
