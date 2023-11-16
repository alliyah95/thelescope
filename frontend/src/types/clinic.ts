import { Timestamp } from "firebase/firestore";

export enum Collections {
    ClinicMembers = "members",
    Clinic = "clinics",
    ThelescopeUsers = "thelescopeUsers",
    Transactions = "transactions",
    Patients = "patients",
    Records = "records",
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

export interface ClinicMemberRegistrationData {
    name: string;
    email: string;
    password: string;
    isAdmin: string;
}

export interface PatientRecordFormData {
    reason: string;
    findings: string;
    treatment: string;
}

export interface StoredPatientRecord extends PatientRecordFormData {
    createdBy: string;
    createdDuring: Timestamp;
    lastUpdatedBy: string;
    lastUpdatedTime: Timestamp;
    customId: string;
}

export interface RetrievedPatientRecord extends StoredPatientRecord {
    id: string;
}
