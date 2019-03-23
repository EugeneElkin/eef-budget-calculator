import * as React from "react";
import { ICalculation } from "../interfaces/i-calculation";
import { DataTransferManagerService } from "../services/data-transfer-manager-service";
import { CalculationRowComponent } from "./calculation-row";
import { CalculationNewRowComponent } from "./calculation-new-row";
import { CancelButtonComponent } from "./reusable/cancel-button";
import { ICalculationItem } from "../interfaces/i-calculation-item";

export interface ICalculationTableComponentProps {
}
export interface ICalculationTableComponentState {
    isNewRowMode: boolean;
    calculation: ICalculation;
    originalCalculation: ICalculation;
}

export class CalculationTableComponent extends React.Component<ICalculationTableComponentProps, ICalculationTableComponentState> {
    constructor(props: any) {
        super(props);

        // TODO: convert to Redux state (partly)?
        this.state = {
            isNewRowMode: false,
            calculation: { items: [] },
            originalCalculation: { items: [] }
        }

        this.handleAddNewRowClick = this.handleAddNewRowClick.bind(this);
        this.handleCancelNewRowClick = this.handleCancelNewRowClick.bind(this);
        this.handleCancelChangesClick = this.handleCancelChangesClick.bind(this);
    }

    private cloneCalculation(calculation: ICalculation): ICalculation {
        let clonnedCalculation = {...calculation};
        clonnedCalculation.items = this.cloneCalculationItems(calculation.items)
        return clonnedCalculation;
    }

    private cloneCalculationItems(items: ICalculationItem[]) {
        let clonnedItems: ICalculationItem[] = []
        for (let i = 0; i < items.length; i++) {
            clonnedItems.push({...items[i]});
        }
        return clonnedItems;
    }

    componentDidMount() {
        DataTransferManagerService.loadCalculation().then((result) => {
            this.setState((state, props) => ({
                calculation: this.cloneCalculation(result),
                originalCalculation: this.cloneCalculation(result)
            }));
        });
    }

    handleAddNewRowClick(): void {
        this.setState((state, props) => ({
            isNewRowMode: true
        }));
    }

    handleCancelNewRowClick(): void {
        this.setState((state, props) => ({
            isNewRowMode: false
        }));
    }

    handleCancelChangesClick(): void {
        this.setState((state, props) => ({
            calculation: this.cloneCalculation(state.originalCalculation)
        }));
    }

    handleRemoveRowClick(id: string): void {
        const fn = (st: ICalculationTableComponentState) => {
            const newArr = this.cloneCalculationItems(st.calculation.items);
            const itemIndex = newArr.findIndex(x => x.id === id);
            newArr.splice(itemIndex, 1);
            return newArr;
        }

        this.setState((state, props) => ({
            calculation: {
                items: fn(state)
            }
        }));
    }

    handleSwitchPaymentStatus(id: string): void {
        const fn = (st: ICalculationTableComponentState) => {
            const newArr = this.cloneCalculationItems(st.calculation.items);
            const itemIndex = newArr.findIndex(x => x.id === id);
            newArr[itemIndex].isPaid = !newArr[itemIndex].isPaid;
            return newArr;
        }
        
        this.setState((state, props) => ({
            calculation: {
                items: fn(state)
            }
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
                        {this.state.isNewRowMode &&
                            <CalculationNewRowComponent handleCancelNewRowClick={this.handleCancelNewRowClick} />
                        }
                        {this.state.calculation.items.map((item) =>
                            <CalculationRowComponent
                                key={item.id.toString()}
                                item={item}
                                handleRemoveRowClick={this.handleRemoveRowClick.bind(this, item.id)}
                                handleSwitchPaymentStatusClick={this.handleSwitchPaymentStatus.bind(this, item.id)} />
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
                                    <CancelButtonComponent handleClick={this.handleCancelChangesClick} />
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
