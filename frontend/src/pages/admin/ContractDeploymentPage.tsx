import React from "react";
import { Banner, ClinicRegistrationForm } from "../../components";

const ContractDeploymentPage: React.FC<{}> = () => {
    // add logic for checking if contract is already deployed
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
                        <p className="lg:text-lg">
                            Thank you for signing up. To start using the
                            application, please enter your clinic name, and then
                            press the button below. Make sure that you have{" "}
                            <span className="text-ths-pink-300 font-bold">
                                Metamask
                            </span>{" "}
                            in your browser 😉
                        </p>

                        <ClinicRegistrationForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractDeploymentPage;
