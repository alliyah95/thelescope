import React, { useState, useEffect } from "react";
import { PatientForm, PatientsList, Modal } from "../../components";
import { getPatients } from "../../utils/clinic";
import { useAuthContext } from "../../context";
import { AuthContextType, RetrievedPatientDocument } from "../../types";

const Patients: React.FC<{}> = () => {
    const [isPatientModalOpen, setIsPatientModalOpen] =
        useState<boolean>(false);
    const { userInfo } = useAuthContext() as AuthContextType;
    const [patients, setPatients] = useState<RetrievedPatientDocument[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const retrievePatients = async () => {
        try {
            setIsLoading(true);
            const clinicPatients = await getPatients(`${userInfo.clinicId}`);
            setPatients(clinicPatients);
        } catch (err) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        retrievePatients();
    }, [userInfo.clinicId, getPatients]);

    const handlePatientModal = () => {
        setIsPatientModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsPatientModalOpen(false);
        retrievePatients();
    };

    return (
        <div className="main-page-wrapper rounded-lg lg:bg-white/10 min-h-[90vh]">
            {isPatientModalOpen && (
                <Modal onClose={handlePatientModal}>
                    <PatientForm
                        closeModal={() => {
                            handleCloseModal();
                        }}
                        accessType="add"
                        refreshPatient={() => {}}
                    />
                </Modal>
            )}
            <div>
                <div className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
                    <h1 className="main-page-heading">Clinic Patients</h1>
                    <div>
                        <button
                            className="btn"
                            onClick={() => {
                                setIsPatientModalOpen(true);
                            }}
                        >
                            Add a patient
                        </button>
                    </div>
                </div>
            </div>

            {!isError && (
                <PatientsList patients={patients} isLoading={isLoading} />
            )}
            {isError && (
                <p className="text-ths-pink-300">
                    An error has occured. Please try again later.
                </p>
            )}
        </div>
    );
};

export default Patients;
