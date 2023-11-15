import React from "react";
import DashboardCard from "../extras/DashboardCard";
import {
    UserGroupIcon,
    ClipboardDocumentIcon,
    InformationCircleIcon,
    CurrencyDollarIcon,
    PrinterIcon,
    FolderOpenIcon,
    Cog8ToothIcon,
} from "@heroicons/react/24/solid";

const Dashboard: React.FC<{}> = () => {
    const isAdmin = JSON.parse(`${localStorage.getItem("isAdmin")}`);

    return (
        <div>
            <h2 className="mb-4">What would you like to do?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-9">
                <DashboardCard
                    linkTo="/patients"
                    heading="View Patients"
                    icon={<UserGroupIcon className="!h-[56px]" />}
                />
                {isAdmin && (
                    <>
                        <DashboardCard
                            linkTo="/transactions"
                            heading="Monitor Transactions"
                            icon={
                                <ClipboardDocumentIcon className="!h-[56px]" />
                            }
                        />
                        <DashboardCard
                            linkTo="/clinic-info"
                            heading="See Clinic Information"
                            icon={
                                <InformationCircleIcon className="!h-[56px]" />
                            }
                        />
                    </>
                )}

                <DashboardCard
                    linkTo="#"
                    heading="Lorem Ipsum"
                    icon={<UserGroupIcon className="!h-[56px]" />}
                />
                <DashboardCard
                    linkTo="#"
                    heading="Dolor Sit Amet"
                    icon={<CurrencyDollarIcon className="!h-[56px]" />}
                />
                <DashboardCard
                    linkTo="#"
                    heading="Consectetur Adipiscing "
                    icon={<PrinterIcon className="!h-[56px]" />}
                />
                <DashboardCard
                    linkTo="#"
                    heading="Donec Id Diam"
                    icon={<FolderOpenIcon className="!h-[56px]" />}
                />
                <DashboardCard
                    linkTo="#"
                    heading="Donec Et Nibh"
                    icon={<Cog8ToothIcon className="!h-[56px]" />}
                />
            </div>
        </div>
    );
};

export default Dashboard;
