import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Clinic } from "../../types";
import { clinicRegistrationSchema } from "../../utils/schemas";
import { getWeb3 } from "../../web3/utils";
import { TransactionManager } from "../../web3/abi";

const ClinicRegistrationForm: React.FC<{}> = () => {
    const [transactionHash, setTransactionHash] = useState<string>("");
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Clinic>({ resolver: zodResolver(clinicRegistrationSchema) });

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const deployContract = async (data: Clinic) => {
        const toastId = toast.loading("Deploying the contract...");

        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const newContract = new web3.eth.Contract(TransactionManager.abi);

            // deploy the contract
            const deployedContract = newContract.deploy({
                data: TransactionManager.evm.bytecode.object,
                arguments: [data.name, "1234"],
            });

            // 1 minute to check if a value is assigned to transactionHash
            // assume that deployment failed if transactionHash is still an empty string
            // after 1 minute
            const _timeoutId = setTimeout(() => {
                if (!transactionHash) {
                    toast.update(toastId, {
                        type: toast.TYPE.ERROR,
                        render: "Deployment unsuccessful.",
                        autoClose: 5000,
                        isLoading: false,
                    });
                }
            }, 60000);
            setTimeoutId(_timeoutId);

            deployedContract
                .send({
                    from: accounts[0],
                    gas: "5000000",
                })
                .on("transactionHash", (hash: string) => {
                    setTransactionHash(hash);
                    clearTimeout(_timeoutId);
                    setTimeoutId(null);
                })
                .on("confirmation", () => {
                    clearTimeout(_timeoutId);
                    setTimeoutId(null);
                    toast.update(toastId, {
                        type: toast.TYPE.SUCCESS,
                        render: "Contract successfully deployed!",
                        isLoading: false,
                        autoClose: 5000,
                    });
                });
        } catch (err: any) {
            toast.update(toastId, {
                type: toast.TYPE.ERROR,
                render: err.toString(),
                autoClose: 5000,
                isLoading: false,
            });
        }
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
