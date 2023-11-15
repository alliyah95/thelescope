import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export interface PatientCardProps {
    name: string;
    customId: string;
}

const PatientCard: React.FC<PatientCardProps> = ({ name, customId }) => {
    return (
        <a href={`/patients/${customId}`}>
            <div className="bg-white rounded-lg p-4 flex gap-4 items-center">
                <AccountCircleIcon className="text-ths-black" />
                <div className="text-ths-black">{name}</div>
            </div>
        </a>
    );
};

export default PatientCard;
