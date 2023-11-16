import React, { useState } from "react";
import {
    StoredPatientRecord,
    Transaction,
    TransactionOperation,
    InvolvedData,
    AuthContextType,
    StoredTransaction,
} from "../../types";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
    deleteRecord,
    createTransaction,
    saveTransaction,
    generateTransactionDescription,
} from "../../utils/clinic";
import { generateId } from "../../utils/functions";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context";
import { Timestamp } from "firebase/firestore";
import { Spinner } from "..";

export interface RecordCardProps {
    info: StoredPatientRecord;
    patientId: string;
    recordId: string;
    reload: Function;
}

const RecordCard: React.FC<RecordCardProps> = ({
    info,
    patientId,
    recordId,
    reload,
}) => {
    const { userInfo } = useAuthContext() as AuthContextType;
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const { seconds, nanoseconds } = info.createdDuring;
    const { seconds: seconds2, nanoseconds: nanoseconds2 } =
        info.lastUpdatedTime;
    const formattedCreationTimestamp = new Date(
        seconds * 1000 + nanoseconds / 1000000
    );
    const formattedUpdateTimestamp = new Date(
        seconds2 * 1000 + nanoseconds2 / 1000000
    );

    const handleDeleteRecord = async () => {
        setIsDeleting(true);
        const deleteToast = toast.loading("Deleting record...");
        const transactionDescription = generateTransactionDescription(
            TransactionOperation.Delete,
            InvolvedData.PatientRecord,
            `${info.customId}`
        );

        const transactionData = {
            customId: generateId(),
            operation: TransactionOperation.Delete,
            performedBy: userInfo.name,
            description: transactionDescription,
            involvedData: InvolvedData.Patient,
            involvedDataId: info.customId,
        } as Transaction;

        try {
            const transactionTimestamp = Timestamp.now();
            const transactionResult = await createTransaction(transactionData);

            if (
                transactionResult.transactionHash &&
                transactionResult.status == "success"
            ) {
                toast.update(deleteToast, {
                    type: toast.TYPE.SUCCESS,
                    render: "Transaction successful!",
                    autoClose: 5000,
                    isLoading: false,
                });

                const confirmationToast = toast.loading(
                    "Finishing things up..."
                );

                const transactionToStore = {
                    ...transactionData,
                    timestamp: transactionTimestamp,
                    transactionHash: transactionResult.transactionHash,
                } as StoredTransaction;

                await saveTransaction(
                    `${userInfo.clinicId}`,
                    transactionToStore
                );

                await deleteRecord(
                    `${userInfo.clinicId}`,
                    `${patientId}`,
                    `${recordId}`
                );

                toast.update(confirmationToast, {
                    type: toast.TYPE.SUCCESS,
                    render: "Record successfully deleted",
                    autoClose: 5000,
                    isLoading: false,
                });
                reload();
            }
        } catch (err) {
            toast.update(deleteToast, {
                type: toast.TYPE.ERROR,
                render: "An error has occured",
                autoClose: 5000,
                isLoading: false,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="bg-white text-ths-black rounded-lg p-8">
            <p>
                <span className="font-bold">Record ID: </span>
                <span>{info.customId}</span>
            </p>
            <p>
                <span className="font-bold">Reason: </span>
                <span>{info.reason}</span>
            </p>
            <p>
                <span className="font-bold">Treatment: </span>
                <span>{info.treatment}</span>
            </p>
            <p>
                <span className="font-bold">Findings: </span>
                <span>{info.findings}</span>
            </p>
            <p>
                <span className="font-bold">Created by: </span>
                <span>{info.createdBy}</span>
            </p>
            <p>
                <span className="font-bold">Created on: </span>
                <span>{formattedCreationTimestamp.toLocaleString()}</span>
            </p>
            <p>
                <span className="font-bold">Last updated by: </span>
                <span>{info.lastUpdatedBy}</span>
            </p>
            <p>
                <span className="font-bold">Created on: </span>
                <span>{formattedUpdateTimestamp.toLocaleString()}</span>
            </p>

            <div className="flex justify-end w-full gap-4">
                <button className="btn  flex gap-2 items-center w-auto">
                    <PencilSquareIcon className="!h-5" />
                    <span>Edit record</span>
                </button>
                <button
                    className="btn  flex gap-2 items-center w-auto"
                    onClick={handleDeleteRecord}
                >
                    {isDeleting ? <Spinner /> : <TrashIcon className="!h-5" />}
                    <span>
                        {isDeleting ? "Deleting record" : "Delete record"}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default RecordCard;
