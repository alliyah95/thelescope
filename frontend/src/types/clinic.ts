export enum Collections {
    ClinicMembers = "members",
    Clinic = "clinics",
    ThelescopeUsers = "thelescopeUsers",
    Transactions = "transactions",
    Patients = "patients",
}

export type Permissions = "CREATE" | "READ" | "UPDATE" | "DELETE";

export interface Clinic {
    name: string;
    contractAddress?: string;
}

export interface ThelescopeUser {
    userId: string;
    name: string;
    email: string;
    isAdmin: boolean;
    clinicId?: string;
    clinicName?: string;
}

export interface ClinicMember extends ThelescopeUser {
    permissions: Permissions[];
    metamaskAddress?: string;
}

export interface PatientFormData {
    firstName: string;
    middleName: string;
    lastName: string;
    age: number;
    gender: string;
    contactNumber: string;
    emailAddress: string;
    address: string;
}

export interface PatientDocument extends PatientFormData {
    customId: string;
}

export interface RetrievedPatientDocument extends PatientDocument {
    id: string;
}
