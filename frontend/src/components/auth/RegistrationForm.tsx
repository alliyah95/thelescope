import React from "react";
import { FormControl } from "@mui/material";
import { AuthForm, AuthForms } from "../../types";
import { InputGroup } from "..";

const RegistrationForm: React.FC<AuthForm> = ({ onSwitch }) => {
    const switchForm = (): void => {
        onSwitch(AuthForms.Login);
    };

    return (
        <div>
            <h1 className="sm:mb-2">Create an account</h1>
            <h2 className="mb-6">Please provide the needed information.</h2>
            <FormControl fullWidth>
                <InputGroup
                    type="text"
                    label="Clinic Name"
                    name="clinicName"
                    placeholder="My Clinic"
                />
                <InputGroup
                    type="text"
                    label="Admin Username"
                    name="adminUsername"
                    placeholder="johndoe"
                />
                <InputGroup
                    type="password"
                    label="Admin Password"
                    name="adminPassword"
                    placeholder="••••••••"
                />
                <InputGroup
                    type="password"
                    label="Confirm Password"
                    name="adminConfirmPassword"
                    placeholder="••••••••"
                />
            </FormControl>
            <button className="btn mt-2" type="submit">
                Sign up
            </button>

            <div className="mt-6 text-center">
                <button onClick={switchForm} className="form-redirect">
                    Already have an account? Sign in
                </button>
            </div>
        </div>
    );
};

export default RegistrationForm;
