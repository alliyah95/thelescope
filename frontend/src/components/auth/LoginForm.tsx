import React from "react";
import { FormControl } from "@mui/material";
import { AuthForm, AuthForms } from "../../types";
import { InputGroup } from "..";

const LoginForm: React.FC<AuthForm> = ({ onSwitch }) => {
    const switchForm = (): void => {
        onSwitch(AuthForms.Registration);
    };

    return (
        <div>
            <h1 className="sm:mb-2">Sign in to continue</h1>
            <h2 className="mb-6">Please enter your account details.</h2>

            <FormControl fullWidth>
                <InputGroup
                    type="text"
                    label="Username"
                    name="username"
                    placeholder="johndoe"
                />
                <InputGroup
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="••••••••"
                />
            </FormControl>
            <button className="btn mt-2" type="submit">
                Log in
            </button>

            <div className="mt-6 text-center">
                <button onClick={switchForm} className="form-redirect">
                    Sign up for an account
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
