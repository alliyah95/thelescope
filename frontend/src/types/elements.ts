export interface BaseElement {
    classNames: string;
}

export interface WrapperElement {
    children: React.ReactNode;
}

export interface ModalProps {
    children: React.ReactNode;
    onClose: Function;
}
