import React from "react";
import { RetrievedPatientDocument } from "../../types";
import { formatName } from "../../utils/functions";
import PatientCard from "./PatientCard";

export interface PatientsListProps {
    patients: RetrievedPatientDocument[];
    isLoading: boolean;
}

const PatientsList: React.FC<PatientsListProps> = ({ patients, isLoading }) => {
    if (isLoading) {
        return (
            <p className="animate-bounce text-ths-pink-300">
                Patients loading...
            </p>
        );
    }

    if (patients.length == 0 && !isLoading) {
        return <p className="text-ths-pink-300">No patients found</p>;
    }

    return (
        <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {patients.map((patient, index) => (
                    <PatientCard
                        name={formatName(
                            patient.firstName,
                            patient.middleName,
                            patient.lastName
                        )}
                        customId={patient.customId}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default PatientsList;
