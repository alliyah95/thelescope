import { Timestamp } from "firebase/firestore";

export enum TransactionOperation {
    Create = "Create",
    Update = "Update",
    Delete = "Delete",
}

export enum InvolvedData {
    Patient = "patient",
    PatientRecord = "patient record",
}

export interface Transaction {
    customId: string;
    operation: TransactionOperation;
    performedBy: string;
    description: string;
    involvedData: InvolvedData;
    involvedDataId: string;
}

export interface StoredTransaction extends Transaction {
    timestamp: Timestamp;
    transactionHash: string;
}

export type TransactionStatus = "success" | "error";

export interface TransactionResult {
    transactionHash: string;
    status: TransactionStatus;
}
