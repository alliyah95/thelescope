import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../../context";
import { AuthForm, AuthForms, LoginFormData } from "../../types";
import { loginSchema } from "../../utils/schemas";
import { AuthContextType } from "../../types";

const LoginForm: React.FC<AuthForm> = ({ onSwitch }) => {
    const navigate = useNavigate();
    const { signInUser } = useAuthContext() as AuthContextType;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const switchForm = (): void => {
        onSwitch(AuthForms.Registration);
    };

    const handleLogin = async (data: LoginFormData): Promise<void> => {
        const loginToast = toast.loading("Signing you in...");
        try {
            await signInUser(data.email, data.password);
            toast.update(loginToast, {
                type: toast.TYPE.SUCCESS,
                render: "Welcome back!",
                autoClose: 4000,
                isLoading: false,
            });
            navigate("/home");
        } catch (err: any) {
            toast.update(loginToast, {
                type: toast.TYPE.ERROR,
                render: "Incorrect email or password",
                autoClose: 4000,
                isLoading: false,
            });
        }
    };

    return (
        <div>
            <h1 className="sm:mb-2">Sign in to continue</h1>
            <h2 className="mb-6">Please enter your account details.</h2>

            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="mb-5">
                    <label htmlFor="email" className="form-label mb-4">
                        Email address
                    </label>
                    <input
                        id="email"
                        type="text"
                        className="form-input"
                        placeholder="johndoe@thelescope.com"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="form-error">{errors.email.message}</p>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="form-label mb-4">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="form-input"
                        placeholder="•••••••"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="form-error">{errors.password.message}</p>
                    )}
                </div>

                <button className="btn mt-2" type="submit">
                    Log in
                </button>
            </form>

            <div className="mt-6 text-center">
                <button onClick={switchForm} className="form-redirect">
                    Sign up for an account
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
