import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context";
import { AuthContextType } from "../../types";
import { getWeb3 } from "../../web3/utils";
import { TransactionManager } from "../../web3/abi";
import { updateContractAddress, storeUserInfo } from "../../utils/clinic";

const ClinicRegistrationForm: React.FC<{}> = () => {
    const [transactionHash, setTransactionHash] = useState<string>("");
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const { userInfo } = useAuthContext() as AuthContextType;

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const deployContract = async () => {
        const deploymentToast = toast.loading("Deploying the contract...");

        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const newContract = new web3.eth.Contract(TransactionManager.abi);

            // deploy the contract
            const deployedContract = newContract.deploy({
                data: TransactionManager.evm.bytecode.object,
                arguments: [userInfo.clinicName, `${userInfo.clinicId}`],
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
                    console.log("Contract Address:", contractAddress);

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

                    toast.update(confirmationToast, {
                        type: toast.TYPE.SUCCESS,
                        render: "Done!",
                        autoClose: 2000,
                        isLoading: false,
                    });
                });
        } catch (err: any) {
            if (err.code === -32002) {
                toast.update(deploymentToast, {
                    type: toast.TYPE.ERROR,
                    render: "Please connect your Metamask account",
                    autoClose: 5000,
                    isLoading: false,
                });
            } else {
                toast.update(deploymentToast, {
                    type: toast.TYPE.ERROR,
                    render: "An error has occured. Please try again",
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
                <input
                    id="name"
                    type="text"
                    className="form-input text-center placeholder:text-center border-glow"
                    value={userInfo.clinicName}
                    readOnly
                />
            </div>

            <div className="mt-6">
                <button
                    className="btn lg:w-auto bounce-slow font-bold"
                    onClick={deployContract}
                >
                    Deploy Contract
                </button>
            </div>
        </div>
    );
};

export default ClinicRegistrationForm;
