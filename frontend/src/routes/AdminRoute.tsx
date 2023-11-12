import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context";
import { AuthContextType, WrapperElement } from "../types";

const AdminRoute: React.FC<WrapperElement> = ({ children }) => {
    console.log("hello");
    const { isUserAdmin, isLoading } = useAuthContext() as AuthContextType;
    console.log(isUserAdmin);

    if (isLoading) {
        return <div>loading</div>;
    }

    if (!isUserAdmin) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default AdminRoute;
