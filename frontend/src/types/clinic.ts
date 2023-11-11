import { DocumentReference } from "firebase/firestore";

export enum Collections {
    ClinicMembers = "clinicMembers",
    Clinic = "clinic",
}

export type Permissions = "CREATE" | "READ" | "UPDATE" | "DELETE";

export interface Clinic {
    name: string;
    contractAddress: string;
}

export interface ClinicMember {
    name: string;
    email: string;
    isAdmin: boolean;
    permissions: Permissions[];
    metamaskAddress?: string;
    clinicId?: DocumentReference;
}
