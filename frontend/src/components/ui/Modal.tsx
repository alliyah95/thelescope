import React, { useState } from "react";
import { ModalProps } from "../../types";
import CloseIcon from "@mui/icons-material/Close";

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

    const closeModal = () => {
        setIsModalOpen(false);
        onClose && onClose();
    };

    return (
        <>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal fade-in-up fade-in-up--fast">
                        <div className="modal-header">
                            <button
                                className="close-button"
                                onClick={closeModal}
                            >
                                <CloseIcon className="text-ths-black" />
                            </button>
                        </div>
                        <div className="modal-content">{children}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
