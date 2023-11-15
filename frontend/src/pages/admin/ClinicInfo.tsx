import React, { useState } from "react";
import { useAuthContext } from "../../context";
import { AuthContextType } from "../../types";
import {
    LoadingTextAnimation,
    MemberCard,
    HorizontalRule,
    Modal,
    NewMemberForm,
} from "../../components";
import { UserPlusIcon } from "@heroicons/react/24/solid";

const ClinicInfo: React.FC<{}> = () => {
    const { userInfo } = useAuthContext() as AuthContextType;
    const [isMemberModalOpen, setIsMemberModalOpen] = useState<boolean>(false);

    const handleModalClose = () => {
        setIsMemberModalOpen(false);
    };

    return (
        <div className="main-page-wrapper rounded-lg lg:bg-white/10 min-h-[90vh]">
            {isMemberModalOpen && (
                <Modal onClose={handleModalClose}>
                    <NewMemberForm closeModal={handleModalClose} />
                </Modal>
            )}
            <h1 className="main-page-heading mb-2">Clinic Information</h1>

            <div>
                <p>
                    <span className="font-bold">Name: </span>{" "}
                    {userInfo.clinicName ? (
                        userInfo.clinicName
                    ) : (
                        <LoadingTextAnimation />
                    )}
                </p>
                <p>
                    <span className="font-bold">Clinic ID: </span>{" "}
                    {userInfo.clinicId ? (
                        userInfo.clinicId
                    ) : (
                        <LoadingTextAnimation />
                    )}
                </p>
            </div>

            <div className="mt-8">
                <div className="flex justify-between items-end mb-2">
                    <h2 className="lg:text-lg font-bold">Clinic Members</h2>
                    <div>
                        <button
                            className="btn whitespace-nowrap flex gap-2 items-center"
                            onClick={() => {
                                setIsMemberModalOpen(true);
                            }}
                        >
                            <UserPlusIcon className="h-5" />
                            <span>Add member</span>
                        </button>
                    </div>
                </div>

                <div className="my-4">
                    <HorizontalRule />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <MemberCard
                        name="Alliyah Joyce"
                        email="alliyah@thelescope.com"
                    />
                </div>
            </div>
        </div>
    );
};

export default ClinicInfo;
