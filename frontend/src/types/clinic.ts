export enum Collections {
    ClinicMembers = "members",
    Clinic = "clinics",
    ThelescopeUsers = "thelescopeUsers",
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
    clinicContract: string;
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
