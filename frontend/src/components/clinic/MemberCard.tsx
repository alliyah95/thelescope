import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export interface MemberCardProps {
    name: string;
    email: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ name, email }) => {
    return (
        <div className="bg-white rounded-lg p-4 flex gap-3 items-center">
            <UserCircleIcon className="text-ths-black h-12" />
            <div>
                <p className="text-ths-black">
                    <span className="font-bold">Name: </span>
                    {name}
                </p>
                <p className="text-ths-black">
                    <span className="font-bold">Email: </span>
                    {email}
                </p>
            </div>
        </div>
    );
};

export default MemberCard;
