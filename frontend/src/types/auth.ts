export enum AuthForms {
    Login = "Login",
    Registration = "Registration",
}

export interface AuthForm {
    onSwitch: (form: AuthForms) => void;
}
