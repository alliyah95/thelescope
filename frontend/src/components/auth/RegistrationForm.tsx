import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthForm, AuthForms, RegistrationFormData } from "../../types";
import { registrationSchema } from "../../utils/schemas";

const RegistrationForm: React.FC<AuthForm> = ({ onSwitch }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
    });

    const switchForm = (): void => {
        onSwitch(AuthForms.Login);
    };

    const handleRegistration = (data: RegistrationFormData): void => {
        console.log(data);
    };

    return (
        <div>
            <h1 className="sm:mb-2">Create an account</h1>
            <h2 className="mb-6">Please provide the needed information.</h2>
            <form onSubmit={handleSubmit(handleRegistration)}>
                <div className="mb-5">
                    <label htmlFor="clinicName" className="form-label mb-4">
                        Clinic Name
                    </label>
                    <input
                        id="clinicName"
                        type="text"
                        className="form-input"
                        placeholder="My Clinic"
                        {...register("clinicName")}
                    />
                    {errors.clinicName && (
                        <p className="form-error">
                            {errors.clinicName.message}
                        </p>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="adminUsername" className="form-label mb-4">
                        Admin Username
                    </label>
                    <input
                        id="adminUsername"
                        type="text"
                        className="form-input"
                        placeholder="john doe"
                        {...register("adminUsername")}
                    />
                    {errors.adminUsername && (
                        <p className="form-error">
                            {errors.adminUsername.message}
                        </p>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="adminPassword" className="form-label mb-4">
                        Admin Password
                    </label>
                    <input
                        id="adminPassword"
                        type="password"
                        className="form-input"
                        placeholder="•••••••"
                        {...register("adminPassword")}
                    />
                    {errors.adminPassword && (
                        <p className="form-error">
                            {errors.adminPassword.message}
                        </p>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="adminConfirmPassword"
                        className="form-label mb-4"
                    >
                        Confirm Password
                    </label>
                    <input
                        id="adminConfirmPassword"
                        type="password"
                        className="form-input"
                        placeholder="•••••••"
                        {...register("adminConfirmPassword")}
                    />
                    {errors.adminConfirmPassword && (
                        <p className="form-error">
                            {errors.adminConfirmPassword.message}
                        </p>
                    )}
                </div>

                <button className="btn mt-2" type="submit">
                    Sign up
                </button>
            </form>

            <div className="mt-6 text-center">
                <button onClick={switchForm} className="form-redirect">
                    Already have an account? Sign in
                </button>
            </div>
        </div>
    );
};

export default RegistrationForm;