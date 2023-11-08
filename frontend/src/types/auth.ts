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
