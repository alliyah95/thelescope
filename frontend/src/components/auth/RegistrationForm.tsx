import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AuthForm,
    AuthForms,
    RegistrationFormData,
    AuthContextType,
} from "../../types";
import { registrationSchema } from "../../utils/schemas";
import { useAuthContext } from "../../context";

const RegistrationForm: React.FC<AuthForm> = ({ onSwitch }) => {
    const [error, setError] = useState<string>("");
    const { registerUser } = useAuthContext() as AuthContextType;
    const navigate = useNavigate();

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

    const handleRegistration = async (
        data: RegistrationFormData
    ): Promise<void> => {
        setError("");

        try {
            await registerUser(data.adminEmail, data.adminPassword);
            console.log("user registered");
            navigate("/home");
        } catch (error: any) {
            setError(error.message);
            console.log(error.message);
        }
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
                        placeholder="John Doe's Clinic"
                        {...register("clinicName")}
                    />
                    {errors.clinicName && (
                        <p className="form-error">
                            {errors.clinicName.message}
                        </p>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="adminName" className="form-label mb-4">
                        Admin Name
                    </label>
                    <input
                        id="adminName"
                        type="text"
                        className="form-input"
                        placeholder="John Doe"
                        {...register("adminName")}
                    />
                    {errors.adminName && (
                        <p className="form-error">{errors.adminName.message}</p>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="adminEmail" className="form-label mb-4">
                        Admin Email
                    </label>
                    <input
                        id="adminEmail"
                        type="text"
                        className="form-input"
                        placeholder="johndoe@thelescope.com"
                        {...register("adminEmail")}
                    />
                    {errors.adminEmail && (
                        <p className="form-error">
                            {errors.adminEmail.message}
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
