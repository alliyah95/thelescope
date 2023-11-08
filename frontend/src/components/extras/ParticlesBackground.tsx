import React, { useCallback, ReactNode } from "react";
import { loadFull } from "tsparticles";
import particlesOptions from "../../utils/particlesOptions";
import Particles, { ParticlesProps } from "react-particles";

interface ParticlesBackgroundProps extends ParticlesProps {
    children?: ReactNode;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
    children,
    ...props
}) => {
    const particlesInit = useCallback(async (main: any) => {
        await loadFull(main);
    }, []);

    return (
        <>
            <Particles
                options={particlesOptions}
                init={particlesInit}
                {...props}
            />
            {children}
        </>
    );
};

export default ParticlesBackground;
