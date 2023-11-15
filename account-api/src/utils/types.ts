export enum Collections {
    ClinicMembers = "members",
    Clinic = "clinics",
    ThelescopeUsers = "thelescopeUsers",
    Transactions = "transactions",
    Patients = "patients",
}
export type Permissions = "CREATE" | "READ" | "UPDATE" | "DELETE";

export interface ThelescopeUser {
    userId: string;
    name: string;
    email: string;
    isAdmin: boolean;
    clinicId?: string;
    clinicName?: string;
    password: string;
}

export interface ClinicMember extends ThelescopeUser {
    permissions: Permissions[];
    metamaskAddress?: string;
}

export interface StoredClinicMember extends Omit<ClinicMember, "password"> {}
