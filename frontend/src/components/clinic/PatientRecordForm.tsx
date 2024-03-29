import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
import {
    ModalElement,
    PatientRecordFormData,
    AuthContextType,
    TransactionOperation,
    InvolvedData,
    Transaction,
    StoredTransaction,
    StoredPatientRecord,
    RetrievedPatientRecord,
} from "../../types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientRecordSchema } from "../../utils/schemas";
import { Spinner } from "..";
import { generateId } from "../../utils/functions";
import {
    generateTransactionDescription,
    saveTransaction,
    createTransaction,
    createRecord,
    editRecord,
} from "../../utils/clinic";

export interface PatientFormProps extends ModalElement {
    patientName: string;
    patientId: string;
    retrieveNewRecords: Function;
    recordData?: RetrievedPatientRecord;
    accessType: "add" | "edit";
    recordId?: string;
}

const PatientRecordForm: React.FC<PatientFormProps> = ({
    closeModal,
    patientName,
    patientId,
    retrieveNewRecords,
    recordData,
    accessType,
    recordId,
}) => {
    console.log(recordData);
    const { userInfo } = useAuthContext() as AuthContextType;
    const [isTransacting, setIsTransacting] = useState<boolean>(false);
    const [isTransactingEdit, setIsTransactingEdit] = useState<boolean>(false);
    const [isTransactionSuccessful, setIsTransactionSuccessful] =
        useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PatientRecordFormData>({
        resolver: zodResolver(patientRecordSchema),
    });

    const handleFormChanges = async (data: PatientRecordFormData) => {
        const isEditing = accessType === "edit";
        if (isEditing) {
            setIsTransactingEdit(true);
        } else {
            setIsTransacting(true);
        }

        const transactionToast = toast.loading(
            `${isEditing ? "Editing" : "Adding"} record...`
        );

        const customRecordId = isEditing ? recordData?.customId : generateId();

        const operation = isEditing
            ? TransactionOperation.Update
            : TransactionOperation.Create;

        const transactionDescription = generateTransactionDescription(
            operation,
            InvolvedData.PatientRecord,
            `${customRecordId}`
        );

        const transactionData = {
            customId: generateId(),
            operation: operation,
            performedBy: userInfo.name,
            description: transactionDescription,
            involvedData: InvolvedData.PatientRecord,
            involvedDataId: customRecordId,
        } as Transaction;

        try {
            const transactionTimestamp = Timestamp.now();
            const transactionResult = await createTransaction(transactionData);
            if (
                transactionResult.transactionHash &&
                transactionResult.status == "success"
            ) {
                toast.update(transactionToast, {
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

                // save transaction
                await saveTransaction(
                    `${userInfo.clinicId}`,
                    transactionToStore
                );

                // save record
                const recordData = {
                    ...data,
                    createdBy: `${userInfo.name}`,
                    createdDuring: Timestamp.now(),
                    lastUpdatedBy: `${userInfo.name}`,
                    lastUpdatedTime: Timestamp.now(),
                    customId: customRecordId,
                } as StoredPatientRecord;

                if (isEditing) {
                    // edit record
                    await editRecord(
                        `${userInfo.clinicId}`,
                        patientId,
                        `${recordId}`,
                        recordData
                    );
                } else {
                    // create record
                    await createRecord(
                        `${userInfo.clinicId}`,
                        patientId,
                        recordData
                    );
                }

                toast.update(confirmationToast, {
                    type: toast.TYPE.SUCCESS,
                    render: `Record successfully ${
                        isEditing ? "edited" : "added"
                    }`,
                    autoClose: 5000,
                    isLoading: false,
                });
                setIsTransactionSuccessful(true);
                if (isEditing) {
                    setIsTransactingEdit(false);
                } else {
                    setIsTransacting(false);
                }
                retrieveNewRecords();
                closeModal();
            } else {
                toast.update(transactionToast, {
                    type: toast.TYPE.ERROR,
                    render: "Transaction failed",
                    autoClose: 5000,
                    isLoading: false,
                });
                setIsTransactionSuccessful(false);
            }
        } catch (err) {
            toast.update(transactionToast, {
                type: toast.TYPE.ERROR,
                render: "An error has occured",
                autoClose: 5000,
                isLoading: false,
            });
        } finally {
            setIsTransacting(false);
            setIsTransactingEdit(false);
        }
    };

    return (
        <div className="text-ths-black p-2 lg:p-4">
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-2 ">
                {accessType === "add" && "Add a record"}
                {accessType === "edit" && "Edit record"}
            </h2>

            <p className=" mb-2 lg:mb-4">
                <span className="font-bold">Patient:</span> {patientName}
            </p>

            <form onSubmit={handleSubmit(handleFormChanges)}>
                <div className="flex flex-col w-full">
                    <label
                        htmlFor="reason"
                        className="form-label form-label--light"
                    >
                        Reason for visit
                    </label>
                    <input
                        id="reason"
                        type="text"
                        className="form-input form-input--light"
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        defaultValue={recordData?.reason ?? ""}
                        {...register("reason")}
                    />
                    {errors.reason && (
                        <p className="form-error">{errors.reason.message}</p>
                    )}
                </div>
                <div className="flex flex-col w-full mt-3 lg:mt-6">
                    <label
                        htmlFor="reason"
                        className="form-label form-label--light"
                    >
                        Findings
                    </label>
                    <input
                        id="findings"
                        type="text"
                        className="form-input form-input--light"
                        placeholder="Cras malesuada aliquam vehicula. Quisque nec massa dolor."
                        defaultValue={recordData?.findings ?? ""}
                        {...register("findings")}
                    />
                    {errors.findings && (
                        <p className="form-error">{errors.findings.message}</p>
                    )}
                </div>
                <div className="flex flex-col w-full mt-3 lg:mt-6">
                    <label
                        htmlFor="treatment"
                        className="form-label form-label--light"
                    >
                        Treatment
                    </label>
                    <input
                        id="treatment"
                        type="text"
                        className="form-input form-input--light"
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        defaultValue={recordData?.treatment ?? ""}
                        {...register("treatment")}
                    />
                    {errors.treatment && (
                        <p className="form-error">{errors.treatment.message}</p>
                    )}
                </div>

                <div className="flex lg:justify-end  mt-4 lg:mt-6">
                    {accessType === "add" ? (
                        <button
                            className="btn lg:w-auto lg:px-12"
                            type="submit"
                            disabled={isTransacting}
                        >
                            {isTransacting && <Spinner />}
                            {"  "}
                            {isTransacting ? "Adding" : "Add record"}
                        </button>
                    ) : (
                        <button
                            className="btn lg:w-auto lg:px-12"
                            type="submit"
                            disabled={isTransactingEdit}
                        >
                            {isTransactingEdit && <Spinner />}
                            {"  "}
                            {isTransactingEdit ? "Editing" : "Edit record"}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default PatientRecordForm;
