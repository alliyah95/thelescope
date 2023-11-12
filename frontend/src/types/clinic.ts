export enum Collections {
    ClinicMembers = "members",
    Clinic = "clinic",
}

export type Permissions = "CREATE" | "READ" | "UPDATE" | "DELETE";

export interface Clinic {
    name: string;
    contractAddress?: string;
}

export interface ClinicMember {
    userId: string;
    name: string;
    email: string;
    isAdmin: boolean;
    permissions: Permissions[];
    clinicId?: string;
    metamaskAddress?: string;
}
