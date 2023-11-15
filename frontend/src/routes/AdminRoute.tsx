import React from "react";
import { Navigate } from "react-router-dom";
import { WrapperElement } from "../types";

const AdminRoute: React.FC<WrapperElement> = ({ children }) => {
    const userId = localStorage.getItem("userId");
    const isAdmin = JSON.parse(`${localStorage.getItem("isAdmin")}`);

    if (!userId || !isAdmin || (userId.length > 0 && !isAdmin)) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default AdminRoute;
