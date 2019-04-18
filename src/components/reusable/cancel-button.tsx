import * as React from "react";
import { ButtonComponent } from "./basic/button";

export interface ICancelButtonComponentComponentProps {
    handleClick: () => void;
}

export class CancelButtonComponent extends React.Component<ICancelButtonComponentComponentProps, {}> {
    public render() {
        return (
            <ButtonComponent className={"cancel"} handleClick={this.props.handleClick}>Cancel</ButtonComponent>
        );
    }
}
