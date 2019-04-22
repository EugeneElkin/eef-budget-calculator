import * as React from "react";
import { ButtonComponent } from "./basic/button";

export interface ISaveButtonComponentProps {
    handleClick: () => void;
    buttonText?: string;
    className?: string;
}

export class SaveButtonComponent extends React.Component<ISaveButtonComponentProps> {
    public render() {
        return (
            <ButtonComponent
                className={this.props.className ? this.props.className : "save"}
                handleClick={this.props.handleClick}
            >{this.props.buttonText ? this.props.buttonText : "Save"}</ButtonComponent>
        );
    }
}
