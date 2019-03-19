import * as React from "react";
import { ICalculation } from "../interfaces/i-calculation";
import { DataTransferManagerService } from "../services/data-transfer-manager-service";
import { CalculationRowComponent } from "./calculation-row";
import { CalculationNewRowComponent } from "./calculation-new-row";
import { SyntheticEvent } from "react";

export interface ICalculationTableComponentProps {
}
export interface ICalculationTableComponentState {
    isNewRowMode: boolean;
}

export class CalculationTableComponent extends React.Component<ICalculationTableComponentProps, ICalculationTableComponentState> {

    private calculation: ICalculation = { items: [] };

    constructor(props: any) {
        super(props);

        // TODO: make it a Promise and move to componentDidMount
        this.calculation = DataTransferManagerService.loadCalculation();

        // TODO: convert to Redux state?
        this.state = {
            isNewRowMode: false
        }

        this.handleAddNewRowClick = this.handleAddNewRowClick.bind(this);
        this.handleCancelNewRowClick = this.handleCancelNewRowClick.bind(this);
    }

    componentDidMount() {
    }

    handleAddNewRowClick(e: SyntheticEvent): void {
        this.setState((state, props) => ({
            isNewRowMode: true
        }));
    }

    handleCancelNewRowClick(e: SyntheticEvent): void {
        this.setState((state, props) => ({
            isNewRowMode: false
        }));
    }

    render() {
        return (
            <React.Fragment>
                <p>Calculation</p>
                <table className="calculation-table">
                    <thead>
                        <tr>
                            <th><button onClick={this.handleAddNewRowClick}>Add</button></th>
                            <th></th>
                            <th>Planned sum</th>
                            <th>Planned aim</th>
                            <th>Paid</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.isNewRowMode && <CalculationNewRowComponent handleCancelNewRowClick={this.handleCancelNewRowClick} />}
                        {this.calculation.items.map((item) =>
                            <CalculationRowComponent key={item.id.toString()} item={item} />
                        )}
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
