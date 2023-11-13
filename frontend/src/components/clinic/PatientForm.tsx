import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientFormData } from "../../types";
import { patientSchema } from "../../utils/schemas";

const PatientForm: React.FC<{}> = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PatientFormData>({
        resolver: zodResolver(patientSchema),
    });

    const handleNewPatient = async (data: PatientFormData) => {
        console.log(data);
    };

    return (
        <div className="text-ths-black p-2 lg:p-4">
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-2 lg:mb-4">
                Add a new Patient
            </h2>
            <form onSubmit={handleSubmit(handleNewPatient)}>
                <div className="flex flex-col xl:flex-row gap-3 lg:gap-6">
                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="firstName"
                            className="form-label form-label--light"
                        >
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            className="form-input form-input--light"
                            placeholder="John"
                            {...register("firstName")}
                        />
                        {errors.firstName && (
                            <p className="form-error">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="middleName"
                            className="form-label form-label--light"
                        >
                            Middle Name
                        </label>
                        <input
                            id="middleName"
                            type="text"
                            className="form-input form-input--light"
                            placeholder="Richards"
                            {...register("middleName")}
                        />
                        {errors.middleName && (
                            <p className="form-error">
                                {errors.middleName.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="lastName"
                            className="form-label form-label--light"
                        >
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            className="form-input form-input--light"
                            placeholder="Doe"
                            {...register("lastName")}
                        />
                        {errors.lastName && (
                            <p className="form-error">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-3 lg:gap-6 mt-3 lg:mt-6">
                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="age"
                            className="form-label form-label--light"
                        >
                            Age
                        </label>
                        <input
                            id="age"
                            type="number"
                            className="form-input form-input--light"
                            placeholder="21"
                            {...register("age", { valueAsNumber: true })}
                        />
                        {errors.age && (
                            <p className="form-error">{errors.age.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="gender"
                            className="form-label form-label--light"
                        >
                            Gender
                        </label>
                        <select
                            className="form-input form-input--light"
                            {...register("gender")}
                        >
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-3 lg:gap-6 mt-3 lg:mt-6">
                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="contactNumber"
                            className="form-label form-label--light"
                        >
                            Contact Number
                        </label>
                        <input
                            id="contactNumber"
                            type="text"
                            className="form-input form-input--light"
                            placeholder="09123456789"
                            {...register("contactNumber")}
                        />
                        {errors.contactNumber && (
                            <p className="form-error">
                                {errors.contactNumber.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="emailAddress"
                            className="form-label form-label--light"
                        >
                            Email Address
                        </label>
                        <input
                            id="emailAddress"
                            type="text"
                            className="form-input form-input--light"
                            placeholder="johndoe@yahoo.com"
                            {...register("emailAddress")}
                        />
                        {errors.emailAddress && (
                            <p className="form-error">
                                {errors.emailAddress.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col w-full mt-3 lg:mt-6">
                    <label
                        htmlFor="address"
                        className="form-label form-label--light"
                    >
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        className="form-input form-input--light"
                        placeholder="123 Blockchain Street ABC"
                        {...register("address")}
                    />
                    {errors.address && (
                        <p className="form-error">{errors.address.message}</p>
                    )}
                </div>

                <div className="flex lg:justify-end mt-4 lg:mt-6">
                    <button className="btn lg:w-auto lg:px-12" type="submit">
                        Add patient
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientForm;
