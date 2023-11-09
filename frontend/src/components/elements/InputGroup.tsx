import React from "react";
import { InputGroupProps } from "../../types";

const InputGroup: React.FC<InputGroupProps> = ({
    label,
    type,
    name,
    placeholder,
}) => {
    return (
        <div className="mb-5">
            <label htmlFor={name} className="form-label mb-4">
                {label}
            </label>
            <input
                id={name}
                type={type}
                className="form-input"
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputGroup;
