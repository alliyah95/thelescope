import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context";
import { AuthContextType, ClinicMember } from "../../types";
import {
    LoadingTextAnimation,
    MemberCard,
    HorizontalRule,
    Modal,
    NewMemberForm,
} from "../../components";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { getAllMembers } from "../../utils/clinic";

const ClinicInfo: React.FC<{}> = () => {
    const { userInfo } = useAuthContext() as AuthContextType;
    const [isMemberModalOpen, setIsMemberModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [members, setMembers] = useState<ClinicMember[]>([]);
    const [isError, setIsError] = useState<boolean>(false);

    const retrieveMembers = async () => {
        try {
            setIsLoading(true);
            const clinicMembers = await getAllMembers(`${userInfo.clinicId}`);
            setMembers(clinicMembers);
        } catch (err) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        retrieveMembers();
    }, [userInfo.clinicId, getAllMembers]);
    const handleModalClose = () => {
        setIsMemberModalOpen(false);
    };

    return (
        <div className="main-page-wrapper rounded-lg lg:bg-white/10 min-h-[90vh]">
            {isMemberModalOpen && (
                <Modal onClose={handleModalClose}>
                    <NewMemberForm
                        closeModal={handleModalClose}
                        refreshMembers={() => {
                            retrieveMembers();
                        }}
                    />
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
                {isLoading && (
                    <p className="animate-bounce text-ths-pink-300">
                        Clinic members loading...
                    </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {members.map((member, index) => (
                        <MemberCard
                            name={member.name}
                            email={member.email}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClinicInfo;
