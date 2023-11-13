import React from "react";
import { Banner, ClinicRegistrationForm } from "../../components";

const ContractDeploymentPage: React.FC<{}> = () => {
    const contract = localStorage.getItem("clinicContract");

    return (
        <div className="min-h-screen flex justify-center items-center py-12 md:py-24 lg:py-32">
            <div className="container max-w-[1024px] mx-auto fade-in-up">
                <div className="text-center">
                    <Banner />
                    <h1 className="text-gradient mb-4 lg:mb-8">
                        Contract Deployment
                    </h1>
                    <div className="max-w-[540px] mx-auto">
                        <p className="lg:text-lg mb-2">Hello there!</p>
                        {!contract && (
                            <p className="lg:text-lg">
                                Thank you for signing up. To start using the
                                application, press the button below to deploy a
                                contract for your clinic. Make sure that you
                                have{" "}
                                <span className="text-ths-pink-300 font-bold">
                                    Metamask
                                </span>{" "}
                                installed in your browser 😉
                            </p>
                        )}
                        {contract && (
                            <div className="">
                                <p className="lg:text-lg">
                                    The contract for your clinic has already
                                    been deployed.
                                </p>

                                <div className="mt-4">
                                    <p className="text-ths-pink-300 mb-2 italic text-sm">
                                        Contract Address
                                    </p>
                                    <div className="form-input bg-white text-center font-bold border-glow">
                                        <p>{contract}</p>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <a
                                        className="btn"
                                        href={`https://sepolia.etherscan.io/address/${contract}`}
                                        target="_blank"
                                    >
                                        View on Etherscan
                                    </a>
                                </div>
                            </div>
                        )}

                        {!contract && <ClinicRegistrationForm />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractDeploymentPage;
