import * as React from "react";
import { ButtonComponent } from "./basic/button";

export interface ICancelButtonComponentComponentProps {
    handleClick: () => void;
    buttonText?: string;
    className?: string;
}

export class CancelButtonComponent extends React.Component<ICancelButtonComponentComponentProps> {
    public render() {
        return (
            <ButtonComponent
                className={this.props.className ? this.props.className : "cancel"}
                handleClick={this.props.handleClick}
            >{this.props.buttonText ? this.props.buttonText : "Cancel"}</ButtonComponent>
        );
    }
}
