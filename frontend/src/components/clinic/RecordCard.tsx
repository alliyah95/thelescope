import React from "react";
import { StoredPatientRecord } from "../../types";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export interface RecordCardProps {
    info: StoredPatientRecord;
}

const RecordCard: React.FC<RecordCardProps> = ({ info }) => {
    const { seconds, nanoseconds } = info.createdDuring;
    const { seconds: seconds2, nanoseconds: nanoseconds2 } =
        info.lastUpdatedTime;
    const formattedCreationTimestamp = new Date(
        seconds * 1000 + nanoseconds / 1000000
    );
    const formattedUpdateTimestamp = new Date(
        seconds2 * 1000 + nanoseconds2 / 1000000
    );

    return (
        <div className="bg-white text-ths-black rounded-lg p-8">
            <p>
                <span className="font-bold">Record ID: </span>
                <span>{info.customId}</span>
            </p>
            <p>
                <span className="font-bold">Reason: </span>
                <span>{info.reason}</span>
            </p>
            <p>
                <span className="font-bold">Treatment: </span>
                <span>{info.treatment}</span>
            </p>
            <p>
                <span className="font-bold">Findings: </span>
                <span>{info.findings}</span>
            </p>
            <p>
                <span className="font-bold">Created by: </span>
                <span>{info.createdBy}</span>
            </p>
            <p>
                <span className="font-bold">Created on: </span>
                <span>{formattedCreationTimestamp.toLocaleString()}</span>
            </p>
            <p>
                <span className="font-bold">Last updated by: </span>
                <span>{info.lastUpdatedBy}</span>
            </p>
            <p>
                <span className="font-bold">Created on: </span>
                <span>{formattedUpdateTimestamp.toLocaleString()}</span>
            </p>

            <div className="flex justify-end w-full gap-4">
                <button className="btn  flex gap-2 items-center w-auto">
                    <PencilSquareIcon className="!h-5" />
                    <span>Edit record</span>
                </button>
                <button className="btn  flex gap-2 items-center w-auto">
                    <TrashIcon className="!h-5" />
                    <span>Delete</span>
                </button>
            </div>
        </div>
    );
};

export default RecordCard;
