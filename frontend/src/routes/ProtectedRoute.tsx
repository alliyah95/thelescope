import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context";
import { AuthContextType, WrapperElement } from "../types";

const ProtectedRoute: React.FC<WrapperElement> = ({ children }) => {
    const { user, isLoading } = useAuthContext() as AuthContextType;

    if (!user && isLoading) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
