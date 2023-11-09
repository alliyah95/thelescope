import { User } from "firebase/auth";

export enum AuthForms {
    Login = "Login",
    Registration = "Registration",
}

export interface AuthForm {
    onSwitch: (form: AuthForms) => void;
}

export interface RegistrationFormData {
    clinicName: string;
    adminUsername: string;
    adminPassword: string;
    adminConfirmPassword: string;
}

export interface LoginFormData {
    username: string;
    password: string;
}

export interface AuthContextType {
    registerUser: (username: string, password: string) => void;
    signInUser: (username: string, password: string) => void;
    signOutUser: () => void;
    user: User | null;
    isLoading: boolean;
}
