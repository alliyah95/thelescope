import { TransactionOperation, InvolvedData } from "../../types";

export const generateTransactionDescription = (
    operation: TransactionOperation,
    involvedData: InvolvedData,
    involvedDataId: string
): string => {
    const description = `${operation}d ${involvedData} with ID ${involvedDataId}.`;
    return description;
};
