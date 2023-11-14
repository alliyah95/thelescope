import React, { useState } from "react";
import { PatientForm, Modal } from "../../components";

const Patients: React.FC<{}> = () => {
    const [isPatientModalOpen, setIsPatientModalOpen] =
        useState<boolean>(false);

    const handlePatientModal = () => {
        setIsPatientModalOpen(false);
    };

    return (
        <div className="main-page-wrapper rounded-lg lg:bg-white/10">
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
            {isPatientModalOpen && (
                <Modal onClose={handlePatientModal}>
                    <PatientForm />
                </Modal>
            )}
        </div>
    );
};

export default Patients;
