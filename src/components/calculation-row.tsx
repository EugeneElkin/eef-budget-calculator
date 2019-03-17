import * as React from "react";
import { ICalculationItem } from "../interfaces/i-calculation-item";

export interface ICalculationRowComponent {
    item: ICalculationItem
}

export class CalculationRowComponent extends React.Component<ICalculationRowComponent> {
    constructor(props: any) {
        super(props);

        console.log(props)
    }

    render() {
        return (
            <tr>
                <td></td>
                <td></td>
                <td>{this.props.item.sum}</td>
                <td>{this.props.item.aim}</td>
                <td><input type="checkbox" />hz</td>
                <td><button className="remove">Rm</button></td >
            </tr>
        );
    }
}