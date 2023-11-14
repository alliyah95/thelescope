import { Timestamp } from "firebase/firestore";

export enum TransactionOperation {
    Create = "Create",
    Update = "Update",
    Delete = "Delete",
}

export enum InvolvedData {
    Patient = "Patient",
    PatientRecord = "PatientRecord",
}

export interface Transaction {
    customId: string;
    description: string;
    timestamp: Timestamp;
    involvedData: InvolvedData;
    involvedDataId: string;
    performedBy: string;
    transactionHash: string;
    operation: TransactionOperation;
}
