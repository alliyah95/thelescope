import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context";
import { AuthContextType, WrapperElement } from "../types";

const AdminRoute: React.FC<WrapperElement> = ({ children }) => {
    console.log("admin");
    const userId = localStorage.getItem("userId");
    const isAdmin = localStorage.getItem("isAdmin");

    // const { userInfo, isUserInfoLoading, isUserAdmin } =
    //     useAuthContext() as AuthContextType;

    // if ((!userInfo && !isUserInfoLoading) || !isUserAdmin) {
    //     return <Navigate to="/" replace />;
    // }

    if (!userId || !isAdmin) {
        console.log("hello");
        return <Navigate to="/" replace />;
    }
    return children;
};

export default AdminRoute;
