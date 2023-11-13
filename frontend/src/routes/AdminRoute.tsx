import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context";
import { AuthContextType, WrapperElement } from "../types";

const AdminRoute: React.FC<WrapperElement> = ({ children }) => {
    const { isUserAdmin, isLoading } = useAuthContext() as AuthContextType;

    console.log("admin route");
    console.log("is user admin: ", isUserAdmin);
    if (isLoading) {
        // change to loading screen
        return <div>loading</div>;
    }

    if (!isUserAdmin) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default AdminRoute;
