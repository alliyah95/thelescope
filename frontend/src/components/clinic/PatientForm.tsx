import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-toastify";
// import { Timestamp } from "firebase/firestore";
// import { useAuthContext } from "../../context";
import {
    PatientFormData,
    Transaction,
    AuthContextType,
    InvolvedData,
    TransactionOperation,
} from "../../types";
import { patientSchema } from "../../utils/schemas";
// import { getWeb3 } from "../../web3/utils";
// import { TransactionManager } from "../../web3/abi";
// import { generateId } from "../../utils/functions";

const PatientForm: React.FC<{}> = () => {
    // const { userInfo } = useAuthContext() as AuthContextType;
    // const [transactionHash, setTransactionHash] = useState<string>("");
    // const [isTransacting, setIsTransacting] = useState<boolean>(false);
    // const [isTransactionSuccessful, setIsTransactionSuccessful] =
    //     useState<boolean>(false);
    // const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PatientFormData>({
        resolver: zodResolver(patientSchema),
    });

    // useEffect(() => {
    //     return () => {
    //         if (timeoutId) {
    //             clearTimeout(timeoutId);
    //         }
    //     };
    // }, [timeoutId]);

    const handleNewPatient = async (data: PatientFormData) => {
        // setIsTransacting(true);
        // const transactionToast = toast.loading("Adding a new patient...");
        // try {
        //     const web3 = await getWeb3();
        //     const accounts = await web3.eth.getAccounts();
        //     const transactionManager = new web3.eth.Contract(
        //         TransactionManager.abi,
        //         userInfo.clinicContract
        //     );
        //     const txId = generateId();
        //     const involvedData = InvolvedData.Patient;
        //     const involvedDataId = generateId();
        //     const operation = TransactionOperation.Create;
        //     const performedBy = userInfo.name;
        //     const timeStamp = Timestamp.now();
        //     const receipt = await transactionManager.methods
        //         .createTransaction(
        //             txId,
        //             involvedData,
        //             involvedDataId,
        //             operation,
        //             performedBy,
        //             "Added a new patient"
        //         )
        //         .send({
        //             from: accounts[0],
        //             gas: "10000000",
        //         });
        //     if (receipt.status) {
        //         toast.update(transactionToast, {
        //             type: toast.TYPE.SUCCESS,
        //             render: "Transaction successful!",
        //             autoClose: 2000,
        //             isLoading: false,
        //         });
        //         console.log("Transaction hash:", receipt.transactionHash);
        //         setTransactionHash(receipt.transactionHash);
        //         setIsTransactionSuccessful(true);
        //     } else {
        //         toast.update(transactionToast, {
        //             type: toast.TYPE.ERROR,
        //             render: "Transaction failed",
        //             autoClose: 5000,
        //             isLoading: false,
        //         });
        //         setIsTransactionSuccessful(false);
        //     }
        //     setIsTransacting(false);
        // } catch (err: any) {
        //     console.log(err);
        //     setIsTransacting(false);
        //     if (err.code === -32002) {
        //         toast.update(transactionToast, {
        //             type: toast.TYPE.ERROR,
        //             render: "Connect your Metamask account!",
        //             autoClose: 5000,
        //             isLoading: false,
        //         });
        //     } else {
        //         toast.update(transactionToast, {
        //             type: toast.TYPE.ERROR,
        //             render: "An error has occured",
        //             autoClose: 5000,
        //             isLoading: false,
        //         });
        //     }
        // }
        // console.log(data);
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
