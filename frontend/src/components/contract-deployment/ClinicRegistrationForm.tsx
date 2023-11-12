import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clinic } from "../../types";
import { clinicRegistrationSchema } from "../../utils/schemas";

const ClinicRegistrationForm: React.FC<{}> = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Clinic>({ resolver: zodResolver(clinicRegistrationSchema) });

    const deployContract = async (data: Clinic) => {
        console.log(data.name);
    };

    return (
        <form className="mt-8" onSubmit={handleSubmit(deployContract)}>
            <div className="mb-5 max-w-xl lg:max-w-md mx-auto">
                <input
                    id="name"
                    type="text"
                    className="form-input text-center placeholder:text-center border-glow"
                    placeholder="Enter the name of your clinic"
                    {...register("name")}
                />
                {errors.name && (
                    <p className="form-error">{errors.name.message}</p>
                )}
            </div>

            <div className="mt-6">
                <button
                    type="submit"
                    className="btn lg:w-auto bounce-slow font-bold"
                >
                    Deploy Contract
                </button>
            </div>
        </form>
    );
};

export default ClinicRegistrationForm;
