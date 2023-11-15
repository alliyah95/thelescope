import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context";
import { getPatient } from "../../utils/clinic";
import { AuthContextType, RetrievedPatientDocument } from "../../types";
import { formatName } from "../../utils/functions";
import { Modal, PatientForm } from "../../components";

const Patient: React.FC<{}> = () => {
    const { userInfo } = useAuthContext() as AuthContextType;
    const { customId } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [patient, setPatient] = useState<RetrievedPatientDocument | null>(
        null
    );
    const [isError, setIsError] = useState<boolean>(false);
    const [isPatientModalOpen, setIsPatientModalOpen] =
        useState<boolean>(false);

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
                <Modal onClose={handlePatientModal}>
                    <PatientForm
                        closeModal={() => {
                            handlePatientModal();
                        }}
                        accessType="view"
                        patientData={patient}
                    />
                </Modal>
            )}

            <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                    {" "}
                    <div className="italic text-ths-pink-300 mb-2">
                        Patient:
                    </div>
                    <h1 className="main-page-heading mb-2">
                        {formatName(
                            `${patient?.firstName}`,
                            `${patient?.middleName}`,
                            `${patient?.lastName}`
                        )}
                    </h1>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:items-start">
                    <button
                        className="btn whitespace-nowrap h-auto"
                        onClick={() => {
                            setIsPatientModalOpen(true);
                        }}
                    >
                        View information
                    </button>
                    <button className="btn whitespace-nowrap">
                        Add record
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Patient;
