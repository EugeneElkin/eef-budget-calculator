import * as React from "react";
import { ICalculationItem } from "../interfaces/i-calculation-item";
import { SyntheticEvent } from "react";

export interface ICalculationRowComponentProps {
    item: ICalculationItem,
    handleRemoveRowClick: () => void;
    handleSwitchPaymentStatusClick: () => void;
}

export class CalculationRowComponent extends React.Component<ICalculationRowComponentProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <tr className={this.props.item.isPaid ? "is-paid": undefined}>
                <td></td>
                <td></td>
                <td>{this.props.item.sum}</td>
                <td>{this.props.item.aim}</td>
                <td><input type="checkbox" checked={this.props.item.isPaid} onClick={this.props.handleSwitchPaymentStatusClick}/></td>
                <td><button className="remove" onClick={this.props.handleRemoveRowClick}>Rm</button></td >
            </tr>
        );
    }
}