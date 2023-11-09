import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context";
import { AuthContextType } from "../types";

const Home: React.FC<{}> = () => {
    const { user, signOutUser } = useAuthContext() as AuthContextType;
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOutUser();
            navigate("/");
            console.log("logged out");
        } catch (err: any) {
            console.log(err.message);
        }
    };
    return (
        <div>
            <h1> This is the home page</h1>
            <p>User Email: {user && user.email}</p>

            <button className="btn" onClick={handleLogout}>
                Log out
            </button>
        </div>
    );
};

export default Home;
