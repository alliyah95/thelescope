import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context";
import { AuthContextType } from "../../types";
import { deleteUserInfo } from "../../utils/clinic";

const Home: React.FC<{}> = () => {
    const { user, signOutUser } = useAuthContext() as AuthContextType;
    const clinicName = localStorage.getItem("clinicName");
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOutUser();
            deleteUserInfo();
            navigate("/");
            console.log("logged out");
        } catch (err: any) {
            console.log(err.message);
        }
    };
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
};

export default Home;
