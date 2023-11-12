import { User } from "firebase/auth";

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
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface AuthContextType {
    registerUser: (email: string, password: string) => void;
    signInUser: (email: string, password: string) => void;
    signOutUser: () => void;
    user: User | null;
    isLoading: boolean;
    isUserAdmin: boolean;
}
