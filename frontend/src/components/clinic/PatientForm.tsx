import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context";
import {
    PatientFormData,
    Transaction,
    AuthContextType,
    InvolvedData,
    TransactionOperation,
    StoredTransaction,
    PatientDocument,
    ModalElement,
    RetrievedPatientDocument,
} from "../../types";
import { patientSchema } from "../../utils/schemas";
import { generateId } from "../../utils/functions";
import {
    createTransaction,
    saveTransaction,
    createPatientDoc,
    generateTransactionDescription,
} from "../../utils/clinic";
import { Spinner } from "..";
import { Timestamp } from "firebase/firestore";

export interface PatientFormProps extends ModalElement {
    accessType: "edit" | "add" | "view";
    patientData?: RetrievedPatientDocument | null;
}

const PatientForm: React.FC<PatientFormProps> = ({
    closeModal,
    accessType,
    patientData,
}) => {
    const { userInfo } = useAuthContext() as AuthContextType;
    const [isTransacting, setIsTransacting] = useState<boolean>(false);
    const [isTransactionSuccessful, setIsTransactionSuccessful] =
        useState<boolean>(false);

    const [buttonText, setButtonText] = useState<string>("Add patient");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PatientFormData>({
        resolver: zodResolver(patientSchema),
    });

    useEffect(() => {
        if (isTransacting) {
            setButtonText("Adding patient");
        } else {
            setButtonText("Add patient");
        }
    }, [isTransacting, isTransactionSuccessful]);

    const addPatient = async (data: PatientFormData) => {
        setIsTransacting(true);
        const transactionToast = toast.loading("Adding new patient...");
        const customPatientId = generateId();
        const transactionDescription = generateTransactionDescription(
            TransactionOperation.Create,
            InvolvedData.Patient,
            `${customPatientId}`
        );

        const transactionData = {
            customId: generateId(),
            operation: TransactionOperation.Create,
            performedBy: userInfo.name,
            description: transactionDescription,
            involvedData: InvolvedData.Patient,
            involvedDataId: customPatientId,
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

                // save patient
                const patientData = {
                    ...data,
                    customId: customPatientId,
                } as PatientDocument;
                await createPatientDoc(`${userInfo.clinicId}`, patientData);

                toast.update(confirmationToast, {
                    type: toast.TYPE.SUCCESS,
                    render: "Patient successfully added",
                    autoClose: 5000,
                    isLoading: false,
                });

                setIsTransactionSuccessful(true);

                // reset form and close modal
                reset();
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
            setIsTransacting(false);
        } catch (err) {
            setIsTransacting(false);
            toast.update(transactionToast, {
                type: toast.TYPE.ERROR,
                render: "An error has occured",
                autoClose: 5000,
                isLoading: false,
            });
        }
    };

    const editPatient = async (data: PatientFormData) => {};

    const handleNewPatient = async (data: PatientFormData) => {
        if (accessType === "add") {
            addPatient(data);
        } else if (accessType === "edit") {
            editPatient(data);
        }
    };

    return (
        <div className="text-ths-black p-2 lg:p-4">
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-2 lg:mb-4">
                Add a new Patient
            </h2>
            <form onSubmit={handleSubmit(handleNewPatient)}>
                <div className="flex flex-col xl:flex-row gap-3 lg:gap-6">
                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="firstName"
                            className="form-label form-label--light"
                        >
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            className="form-input form-input--light"
                            placeholder="John"
                            {...register("firstName")}
                            readOnly={accessType === "view"}
                            defaultValue={
                                patientData && `${patientData.firstName}`
                            }
                        />
                        {errors.firstName && (
                            <p className="form-error">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="middleName"
                            className="form-label form-label--light"
                        >
                            Middle Name
                        </label>
                        <input
                            id="middleName"
                            type="text"
                            className="form-input form-input--light"
                            placeholder="Richards"
                            {...register("middleName")}
                            readOnly={accessType === "view"}
                            defaultValue={
                                patientData && `${patientData.middleName}`
                            }
                        />
                        {errors.middleName && (
                            <p className="form-error">
                                {errors.middleName.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="lastName"
                            className="form-label form-label--light"
                        >
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            className="form-input form-input--light"
                            placeholder="Doe"
                            {...register("lastName")}
                            readOnly={accessType === "view"}
                            defaultValue={
                                patientData && `${patientData.lastName}`
                            }
                        />
                        {errors.lastName && (
                            <p className="form-error">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-3 lg:gap-6 mt-3 lg:mt-6">
                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="age"
                            className="form-label form-label--light"
                        >
                            Age
                        </label>
                        <input
                            id="age"
                            type="number"
                            className="form-input form-input--light"
                            placeholder="21"
                            {...register("age", { valueAsNumber: true })}
                            readOnly={accessType === "view"}
                            defaultValue={patientData && `${patientData.age}`}
                        />
                        {errors.age && (
                            <p className="form-error">{errors.age.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="gender"
                            className="form-label form-label--light"
                        >
                            Gender
                        </label>
                        <select
                            defaultValue={patientData && patientData.gender}
                            disabled={accessType === "view"}
                            className="form-input form-input--light"
                            {...register("gender")}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-3 lg:gap-6 mt-3 lg:mt-6">
                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="contactNumber"
                            className="form-label form-label--light"
                        >
                            Contact Number
                        </label>
                        <input
                            readOnly={accessType === "view"}
                            id="contactNumber"
                            type="text"
                            className="form-input form-input--light"
                            placeholder="09123456789"
                            {...register("contactNumber")}
                            defaultValue={
                                patientData && `${patientData.contactNumber}`
                            }
                        />
                        {errors.contactNumber && (
                            <p className="form-error">
                                {errors.contactNumber.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="emailAddress"
                            className="form-label form-label--light"
                        >
                            Email Address
                        </label>
                        <input
                            readOnly={accessType === "view"}
                            id="emailAddress"
                            type="text"
                            className="form-input form-input--light"
                            placeholder="johndoe@yahoo.com"
                            {...register("emailAddress")}
                            defaultValue={
                                patientData && `${patientData.emailAddress}`
                            }
                        />
                        {errors.emailAddress && (
                            <p className="form-error">
                                {errors.emailAddress.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col w-full mt-3 lg:mt-6">
                    <label
                        htmlFor="address"
                        className="form-label form-label--light"
                    >
                        Address
                    </label>
                    <input
                        readOnly={accessType === "view"}
                        id="address"
                        type="text"
                        className="form-input form-input--light"
                        placeholder="123 Blockchain Street ABC"
                        {...register("address")}
                        defaultValue={patientData && `${patientData.address}`}
                    />
                    {errors.address && (
                        <p className="form-error">{errors.address.message}</p>
                    )}
                </div>

                <div className="flex lg:justify-end mt-4 lg:mt-6">
                    {accessType === "add" && (
                        <button
                            className="btn lg:w-auto lg:px-12"
                            type="submit"
                            disabled={isTransacting}
                        >
                            {isTransacting && <Spinner />}
                            {"  "}
                            {buttonText}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default PatientForm;
