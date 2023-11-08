export interface BaseElement {
    classNames: string;
}

export interface InputGroupProps {
    type: React.HTMLInputTypeAttribute;
    label: string;
    name: string;
    placeholder: string;
    onInputChange?: Function;
}
