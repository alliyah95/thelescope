import React from "react";
import { useAuthContext } from "../../context";
import { AuthContextType } from "../../types";
import {
    LoadingTextAnimation,
    HorizontalRule,
    Dashboard,
} from "../../components";

const Home: React.FC<{}> = () => {
    const { userInfo } = useAuthContext() as AuthContextType;

    return (
        <div className="main-page-wrapper rounded-lg lg:bg-white/10 min-h-[90vh]">
            <div className="text-ths-pink-300 text-sm mb-2">Clinic:</div>
            <h1 className="main-page-heading">
                {userInfo.clinicName ? (
                    userInfo.clinicName
                ) : (
                    <LoadingTextAnimation />
                )}
            </h1>
            <div className="my-2 lg:my-4">
                <HorizontalRule />
            </div>

            <Dashboard />
        </div>
    );
};

export default Home;
