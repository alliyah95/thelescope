import React from "react";
import { thelescopeBanner } from "../../assets";

const Banner: React.FC<{}> = () => {
    return (
        <div className="text-center mb-8">
            <div className="max-w-[200px] mx-auto">
                <img src={thelescopeBanner} />
            </div>
            <div className="animate-pulse italic">Eyeing all your actions.</div>
        </div>
    );
};

export default Banner;
