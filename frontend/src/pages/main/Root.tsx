import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ParticlesBackground, Nav } from "../../components";
import { useAuthContext } from "../../context";
import { AuthContextType } from "../../types";

const Root: React.FC<{}> = () => {
    const { user } = useAuthContext() as AuthContextType;

    return (
        <ParticlesBackground>
            {user && (
                <header className="py-6">
                    <Nav />
                </header>
            )}

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
