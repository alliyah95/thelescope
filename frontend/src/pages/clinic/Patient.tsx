import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { toast } from "react-toastify";
import { Timestamp } from "firebase/firestore";
import { useAuthContext } from "../../context";
import {
    getPatient,
    createTransaction,
    deletePatientDoc,
    saveTransaction,
    generateTransactionDescription,
} from "../../utils/clinic";
import {
    AuthContextType,
    RetrievedPatientDocument,
    TransactionOperation,
    InvolvedData,
    Transaction,
    StoredTransaction,
} from "../../types";
import { formatName, generateId } from "../../utils/functions";
import {
    Modal,
    PatientForm,
    PatientRecordForm,
    Spinner,
} from "../../components";

const Patient: React.FC<{}> = () => {
    const navigate = useNavigate();
    const { userInfo } = useAuthContext() as AuthContextType;
    const { customId } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [patient, setPatient] = useState<RetrievedPatientDocument | null>(
        null
    );
    const [isError, setIsError] = useState<boolean>(false);
    const [isPatientModalOpen, setIsPatientModalOpen] =
        useState<boolean>(false);
    const [isTransacting, setIsTransacting] = useState<boolean>(false);
    const [isTransactionSuccessful, setIsTransactionSuccessful] =
        useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showRecordModal, setShowRecordModal] = useState<boolean>(false);

    const formattedName = formatName(
        `${patient?.firstName}`,
        `${patient?.middleName}`,
        `${patient?.lastName}`
    );

    const retrievePatient = async () => {
        try {
            setIsLoading(true);
            const clinicPatient = await getPatient(
                `${userInfo.clinicId}`,
                `${customId}`
            );
            setPatient(clinicPatient);
        } catch (err) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        retrievePatient();
    }, [userInfo.clinicId]);

    const handlePatientModal = () => {
        setIsPatientModalOpen(false);
    };

    const handleDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleRecordModal = () => {
        setShowRecordModal(false);
    };

    const deletePatient = async () => {
        setIsTransacting(true);
        const deleteToast = toast.loading("Deleting patient...");
        const transactionDescription = generateTransactionDescription(
            TransactionOperation.Delete,
            InvolvedData.Patient,
            `${patient?.customId}`
        );

        const transactionData = {
            customId: generateId(),
            operation: TransactionOperation.Delete,
            performedBy: userInfo.name,
            description: transactionDescription,
            involvedData: InvolvedData.Patient,
            involvedDataId: patient?.customId,
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

                // save transaction
                await saveTransaction(
                    `${userInfo.clinicId}`,
                    transactionToStore
                );

                // delete patient
                await deletePatientDoc(
                    `${userInfo.clinicId}`,
                    `${patient?.id}`
                );
                toast.update(confirmationToast, {
                    type: toast.TYPE.SUCCESS,
                    render: "Patient successfully deleted",
                    autoClose: 5000,
                    isLoading: false,
                });

                setIsTransactionSuccessful(true);

                // back to patients page
                navigate("/patients");
            } else {
                toast.update(deleteToast, {
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
            toast.update(deleteToast, {
                type: toast.TYPE.ERROR,
                render: "An error has occured",
                autoClose: 5000,
                isLoading: false,
            });
        }
    };

    if (isLoading || !userInfo) {
        return (
            <div className="main-page-wrapper rounded-lg lg:bg-white/10 min-h-[90vh]">
                <p className="animate-bounce text-ths-pink-300">
                    Patient loading...
                </p>
            </div>
        );
    }

    if ((patient === null && !isLoading) || isError) {
        <div className="main-page-wrapper rounded-lg lg:bg-white/10 min-h-[90vh]">
            <p className=" text-ths-pink-300">Patient not found</p>
        </div>;
    }

    return (
        <div className="main-page-wrapper rounded-lg lg:bg-white/10 min-h-[90vh]">
            {isPatientModalOpen && (
                <Modal onClose={handlePatientModal} key={1}>
                    <PatientForm
                        closeModal={() => {
                            handlePatientModal();
                        }}
                        accessType="view"
                        patientData={patient}
                    />
                </Modal>
            )}

            {showRecordModal && (
                <Modal onClose={handleRecordModal} key={2}>
                    <PatientRecordForm
                        closeModal={() => {
                            handleRecordModal();
                        }}
                        patientName={formattedName}
                        patientId={`${patient?.id}`}
                    />
                </Modal>
            )}

            {showDeleteModal && (
                <Modal onClose={handleDeleteModal} key={3}>
                    <div className="py-8 px-12">
                        <p className="text-ths-black font-bold text-center lg:text-lg">
                            Are you sure you want to delete this patient?
                        </p>
                        <div className="flex mt-8">
                            <button
                                className="btn btn--transparent"
                                onClick={() => {
                                    setShowDeleteModal(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button className="btn" onClick={deletePatient}>
                                {isTransacting && <Spinner />}
                                {"   "}
                                {isTransacting ? "Deleting" : "Yes"}
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                    {" "}
                    <div className="italic text-ths-pink-300 mb-2">
                        Patient:
                    </div>
                    <h1 className="main-page-heading mb-2">{formattedName}</h1>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-start">
                    <button
                        className="btn whitespace-nowrap flex gap-2 items-center"
                        onClick={() => {
                            setIsPatientModalOpen(true);
                        }}
                    >
                        <InfoIcon className="!h-5" />
                        <span>View information</span>
                    </button>
                    <button
                        className="btn whitespace-nowrap flex gap-2 items-center"
                        onClick={() => {
                            setShowDeleteModal(true);
                        }}
                    >
                        <DeleteIcon className="!h-5" />
                        <span> Delete patient</span>
                    </button>
                    <button
                        className="btn whitespace-nowrap flex gap-2 items-center"
                        onClick={() => {
                            setShowRecordModal(true);
                        }}
                    >
                        <NoteAddIcon className="!h-5" />
                        <span>Add record</span>
                    </button>
                </div>
            </div>

            {/* records */}
        </div>
    );
};

export default Patient;
