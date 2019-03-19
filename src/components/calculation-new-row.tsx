import React = require("react");
import { SyntheticEvent } from "react";

export interface ICalculationNewRowComponentProps {
    handleCancelNewRowClick: (e: SyntheticEvent) => void;
}

export class CalculationNewRowComponent extends React.Component<ICalculationNewRowComponentProps> {
    constructor(props: any) {
        super(props);

        console.log(props)
    }

    render() {
        return (
            <tr>
                <td></td>
                <td><button className="cancel" onClick={this.props.handleCancelNewRowClick}>Cnl</button></td>
                <td><input itemType={"text"} placeholder="0,00" /></td>
                <td><input itemType={"text"} /></td>
                <td></td>
                <td><button>Ok</button></td>
            </tr>
        );
    }
}