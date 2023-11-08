import React from "react";
import { theloscopeBanner } from "../../assets";

const Banner: React.FC<{}> = () => {
    return (
        <div className="text-center mb-8">
            <div className="max-w-[200px] mx-auto">
                <img src={theloscopeBanner} />
            </div>
            <div>Eyeing all your actions.</div>
        </div>
    );
};

export default Banner;
