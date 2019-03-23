import React = require("react");
import { SyntheticEvent } from "react";
import { CancelButtonComponent } from "./reusable/cancel-button";

export interface ICalculationNewRowComponentProps {
    handleCancelNewRowClick: () => void;
}

export class CalculationNewRowComponent extends React.Component<ICalculationNewRowComponentProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td></td>
                <td><CancelButtonComponent handleClick={this.props.handleCancelNewRowClick} /></td>
                <td><input itemType={"text"} placeholder="0,00" /></td>
                <td><input itemType={"text"} /></td>
                <td></td>
                <td><button>Ok</button></td>
            </tr>
        );
    }
}