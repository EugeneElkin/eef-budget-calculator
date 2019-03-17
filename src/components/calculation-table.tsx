import * as React from "react";
import { ICalculation } from "../interfaces/i-calculation";
import { DataTransferManagerService } from "../services/data-transfer-manager-service";
import { CalculationRowComponent } from "./calculation-row";

export interface ICalculationTableComponent {
}

export class CalculationTableComponent extends React.Component<ICalculationTableComponent> {

    private calculation: ICalculation = { items: []};

    constructor(props: any) {
        super(props);
        this.calculation = DataTransferManagerService.loadCalculation();
    }

    componentDidMount() {
    }

    render() {
        console.log(this.calculation);
        const rows = this.calculation.items.map((item) =>
            <CalculationRowComponent key={item.id.toString()} item={item} />
        );

        return (
            <React.Fragment>
                <p>Calculation</p>
                <table className="calculation-table">
                    <thead>
                        <tr>
                            <th><button>Add</button></th>
                            <th></th>
                            <th>Planned sum</th>
                            <th>Planned aim</th>
                            <th>Paid</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td colSpan={4}></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6}>
                                <div className="flex-container">
                                    <button className="cancel">Cancel</button>
                                    <button >Save</button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </React.Fragment >
        );
    }
}
