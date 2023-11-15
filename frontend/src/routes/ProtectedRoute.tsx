import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context";
import { AuthContextType, WrapperElement } from "../types";

const ProtectedRoute: React.FC<WrapperElement> = ({ children }) => {
    // const { userInfo, isUserInfoLoading } = useAuthContext() as AuthContextType;
    const userId = localStorage.getItem("userId");

    if (!userId) {
        return <Navigate to="/" replace />;
    }
    // if (!userInfo && !isUserInfoLoading) {
    // }

    return children;
};

export default ProtectedRoute;
