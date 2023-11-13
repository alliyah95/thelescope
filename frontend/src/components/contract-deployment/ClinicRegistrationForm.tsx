import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context";
import { AuthContextType } from "../../types";
import { getWeb3 } from "../../web3/utils";
import { TransactionManager } from "../../web3/abi";
import {
    updateContractAddress,
    storeUserInfo,
    updateUserContract,
} from "../../utils/clinic";
import { LoadingTextAnimation, Spinner } from "..";

const ClinicRegistrationForm: React.FC<{}> = () => {
    const [transactionHash, setTransactionHash] = useState<string>("");
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const { userInfo } = useAuthContext() as AuthContextType;
    const [isDeploying, setIsDeploying] = useState<boolean>(false);
    const [isContractDeployed, setIsContractDeloyed] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    useEffect(() => {
        if (!userInfo) {
            setIsButtonDisabled(true);
            return;
        }
        if (isDeploying || isContractDeployed) {
            setIsButtonDisabled(true);
            return;
        }
        setIsButtonDisabled(false);
    }, [isButtonDisabled, isDeploying, userInfo]);

    const deployContract = async () => {
        setIsDeploying(true);
        const deploymentToast = toast.loading("Deploying the contract...");

        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const newContract = new web3.eth.Contract(TransactionManager.abi);

            // deploy the contract
            const deployedContract = newContract.deploy({
                data: TransactionManager.evm.bytecode.object,
                arguments: [`${userInfo.clinicName}`, `${userInfo.clinicId}`],
            });

            // 1 minute to check if a value is assigned to transactionHash
            // assume that deployment failed if transactionHash is still an empty string
            // after 1 minute
            const _timeoutId = setTimeout(() => {
                if (!transactionHash) {
                    toast.update(deploymentToast, {
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
                    toast.update(deploymentToast, {
                        type: toast.TYPE.SUCCESS,
                        render: "Contract successfully deployed!",
                        autoClose: 2000,
                        isLoading: false,
                    });
                })
                .on("receipt", async (receipt) => {
                    const contractAddress = receipt.contractAddress;
                    const confirmationToast = toast.loading(
                        "Finishing things up..."
                    );
                    await updateContractAddress(
                        `${userInfo.clinicId}`,
                        `${contractAddress}`
                    );
                    storeUserInfo({
                        ...userInfo,
                        clinicContract: `${contractAddress}`,
                    });
                    updateUserContract(
                        `${userInfo.userId}`,
                        `${contractAddress}`
                    );
                    toast.update(confirmationToast, {
                        type: toast.TYPE.SUCCESS,
                        render: "Done!",
                        autoClose: 2000,
                        isLoading: false,
                    });
                    setIsDeploying(false);
                    setIsContractDeloyed(true);
                });
        } catch (err: any) {
            setIsDeploying(false);
            if (err.code === -32002) {
                toast.update(deploymentToast, {
                    type: toast.TYPE.ERROR,
                    render: "Connect your Metamask account!",
                    autoClose: 5000,
                    isLoading: false,
                });
            } else {
                toast.update(deploymentToast, {
                    type: toast.TYPE.ERROR,
                    render: "An error has occured",
                    autoClose: 5000,
                    isLoading: false,
                });
            }
        }
    };

    return (
        <div className="mt-8">
            <div className="mb-5 max-w-xl lg:max-w-md mx-auto">
                <p className="text-ths-pink-300 mb-2 italic text-sm">
                    Thelescope contract deployment for:
                </p>
                <div className="form-input bg-white text-center font-bold border-glow">
                    {userInfo.clinicName ? (
                        <p>{userInfo.clinicName}</p>
                    ) : (
                        <LoadingTextAnimation />
                    )}
                </div>
            </div>

            <div className="mt-6">
                <button
                    className="btn lg:w-auto bounce-slow"
                    onClick={deployContract}
                    disabled={isButtonDisabled}
                >
                    {isDeploying && <Spinner />}
                    {"   "}{" "}
                    {isDeploying
                        ? "Deploying..."
                        : isContractDeployed
                        ? "Contract deployed!"
                        : "Deploy Contract"}
                </button>
            </div>
        </div>
    );
};

export default ClinicRegistrationForm;
