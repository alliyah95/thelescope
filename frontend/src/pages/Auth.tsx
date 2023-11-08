import React, { useState } from "react";
import {
    LoginForm,
    RegistrationForm,
    Banner,
    HorizontalRule,
} from "../components";
import { AuthForms } from "../types";

const Auth: React.FC<{}> = () => {
    const [activeForm, setActiveForm] = useState<AuthForms>(AuthForms.Login);

    const switchForm = (form: AuthForms): void => {
        setActiveForm(form);
    };

    return (
        <div className="min-h-screen flex justify-center items-center py-12">
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
