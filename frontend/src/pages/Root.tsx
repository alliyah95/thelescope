import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ParticlesBackground } from "../components";

const Root: React.FC<{}> = () => {
    return (
        <ParticlesBackground>
            <main>
                <Outlet />
                <ToastContainer
                    hideProgressBar={true}
                    pauseOnFocusLoss={false}
                    position={toast.POSITION.BOTTOM_RIGHT}
                    icon={({ type }) =>
                        type === toast.TYPE.ERROR
                            ? "🚨"
                            : type === toast.TYPE.SUCCESS
                            ? "🚀"
                            : "🕐"
                    }
                />
            </main>
        </ParticlesBackground>
    );
};

export default Root;
