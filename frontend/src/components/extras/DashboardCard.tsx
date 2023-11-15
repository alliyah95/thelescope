import React from "react";

export interface DashboardCardProps {
    linkTo: string;
    icon: React.ReactNode;
    heading: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
    linkTo,
    icon,
    heading,
}) => {
    return (
        <a href={linkTo}>
            <div className="bg-white rounded-lg text-ths-black flex flex-col justify-center items-center px-8 py-12">
                <div className="mb-4">{icon}</div>
                <h3 className="text-lg font-bold text-gradient">{heading}</h3>
            </div>
        </a>
    );
};

export default DashboardCard;
