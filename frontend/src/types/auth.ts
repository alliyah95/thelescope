import React from "react";
import { User } from "firebase/auth";
import { ClinicMember } from ".";

export enum AuthForms {
    Login = "Login",
    Registration = "Registration",
}

export interface AuthForm {
    onSwitch: (form: AuthForms) => void;
}

export interface RegistrationFormData {
    adminName: string;
    adminEmail: string;
    adminPassword: string;
    adminConfirmPassword: string;
    clinicName: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface AuthContextType {
    registerUser: (email: string, password: string) => void;
    signInUser: (email: string, password: string) => void;
    signOutUser: () => void;
    setCurrentClinic: React.Dispatch<React.SetStateAction<string>>;
    user: User | null | undefined;
    isLoading: boolean;
    isUserAdmin: boolean;
    currentClinic: string;
    userInfo: ClinicMember;
}
