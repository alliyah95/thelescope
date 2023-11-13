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
    clinicName: string;
}

export interface ClinicMember extends ThelescopeUser {
    permissions: Permissions[];
    metamaskAddress?: string;
    clinicContract: string;
}
