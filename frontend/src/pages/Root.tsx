import React from "react";
import { Outlet } from "react-router-dom";
import { ParticlesBackground } from "../components";

const Root: React.FC<{}> = () => {
    return (
        <ParticlesBackground>
            <main>
                <Outlet />
            </main>
        </ParticlesBackground>
    );
};

export default Root;
