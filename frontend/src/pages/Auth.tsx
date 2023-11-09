import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context";
import {
    LoginForm,
    RegistrationForm,
    Banner,
    HorizontalRule,
} from "../components";
import { AuthForms, AuthContextType } from "../types";

const Auth: React.FC<{}> = () => {
    const [activeForm, setActiveForm] = useState<AuthForms>(AuthForms.Login);
    const navigate = useNavigate();
    const [showPage, setShowPage] = useState<boolean>(false);
    const { user, isLoading } = useAuthContext() as AuthContextType;

    useEffect(() => {
        if (user && !isLoading) {
            setShowPage(false);
            navigate("/home");
        } else {
            setShowPage(true);
        }
    }, [user, navigate]);

    if (!showPage) {
        return <></>;
    }

    const switchForm = (form: AuthForms): void => {
        setActiveForm(form);
    };

    return (
        <div className="min-h-screen flex justify-center items-center py-12 md:py-24 lg:py-32">
            <div className="container max-w-[540px]">
                <Banner />
                <HorizontalRule />

                <div className="form-container">
                    {activeForm === AuthForms.Login ? (
                        <LoginForm onSwitch={switchForm} />
                    ) : (
                        <RegistrationForm onSwitch={switchForm} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;
