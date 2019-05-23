import * as React from "react";
import { ButtonComponent, IButtonComponentComponentProps } from "./basic/button";

export class CancelButtonComponent extends React.Component<IButtonComponentComponentProps> {
    public render() {
        return (
            <ButtonComponent
                className={this.props.className ? this.props.className : "cancel"}
                handleClick={this.props.handleClick}
                isDisabled={this.props.isDisabled}
            >{this.props.children ? this.props.children : "Cancel"}</ButtonComponent>
        );
    }
}
