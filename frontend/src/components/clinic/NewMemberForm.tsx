import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "../../context";
import {
    ClinicMemberRegistrationData,
    ModalElement,
    AuthContextType,
    ClinicMember,
} from "../../types";
import { clinicMemberSchema } from "../../utils/schemas";
import { Spinner } from "..";

export interface NewMemberFormProps extends ModalElement {
    refreshMembers: Function;
}

const NewMemberForm: React.FC<NewMemberFormProps> = ({
    closeModal,
    refreshMembers,
}) => {
    const { userInfo } = useAuthContext() as AuthContextType;
    const [isAdding, setIsAdding] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ClinicMemberRegistrationData>({
        resolver: zodResolver(clinicMemberSchema),
    });

    const handleNewMember = async (data: ClinicMemberRegistrationData) => {
        setIsAdding(true);
        const memberToast = toast.loading("Adding member...");

        const memberData = {
            name: data.name,
            email: data.email,
            password: data.password,
            isAdmin: JSON.parse(data.isAdmin),
            clinicId: userInfo.clinicId,
            clinicName: userInfo.clinicName,
            permissions: ["CREATE", "READ", "UPDATE", "DELETE"],
        };

        try {
            const account = await fetch("http://localhost:3000/register", {
                method: "POST",
                body: JSON.stringify(memberData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!account.ok || account.status === 500) {
                toast.update(memberToast, {
                    type: toast.TYPE.ERROR,
                    render: "An error has occured",
                    autoClose: 5000,
                    isLoading: false,
                });
            } else {
                const data = await account.json();
                toast.update(memberToast, {
                    type: toast.TYPE.SUCCESS,
                    render: "Member successfully added!",
                    autoClose: 5000,
                    isLoading: false,
                });
                refreshMembers();
            }
            closeModal();
        } catch (err) {
            console.log(err);
            toast.update(memberToast, {
                type: toast.TYPE.ERROR,
                render: "An error has occured",
                autoClose: 5000,
                isLoading: false,
            });
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="text-ths-black p-2 lg:p-4">
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-2 lg:mb-4">
                Add a Clinic Member
            </h2>
            <form onSubmit={handleSubmit(handleNewMember)}>
                <div className="flex flex-col xl:flex-row gap-3 lg:gap-6">
                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="name"
                            className="form-label form-label--light"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="form-input form-input--light"
                            placeholder="Name"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="form-error">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="email"
                            className="form-label form-label--light"
                        >
                            Email address
                        </label>
                        <input
                            id="email"
                            type="text"
                            className="form-input form-input--light"
                            placeholder="newmember@email.com"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="form-error">{errors.email.message}</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col xl:flex-row gap-3 lg:gap-6 mt-3 lg:mt-6">
                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="password"
                            className="form-label form-label--light"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="text"
                            className="form-input form-input--light"
                            placeholder="newmemberpassword123"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="form-error">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="isAdmin"
                            className="form-label form-label--light"
                        >
                            Is user an admin?
                        </label>
                        <select
                            defaultValue={"false"}
                            className="form-input form-input--light"
                            {...register("isAdmin")}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>

                        {errors.isAdmin && (
                            <p className="form-error">
                                {errors.isAdmin.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex lg:justify-end mt-4 lg:mt-6">
                    <button
                        className="btn lg:w-auto lg:px-12"
                        type="submit"
                        disabled={isAdding}
                    >
                        {isAdding && <Spinner />}
                        {"  "}
                        {isAdding ? "Adding" : "Add member"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewMemberForm;
