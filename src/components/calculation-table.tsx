import * as React from "react";

import { ICalculation } from "../interfaces/i-calculation";
import { ICalculationItem } from "../interfaces/i-calculation-item";
import { DataTransferManagerService } from "../services/data-transfer-manager-service";
import { CalculationNewRowComponent } from "./calculation-new-row";
import { CalculationRowComponent } from "./calculation-row";
import { CancelButtonComponent } from "./reusable/cancel-button";

export interface ICalculationTableComponentState {
    isNewRowMode: boolean;
    calculation: ICalculation;
    originalCalculation: ICalculation;
    activeRowId?: string;
}

export class CalculationTableComponent extends React.Component<{}, ICalculationTableComponentState> {
    private totalPlannedExpenses: number = 0;

    constructor(props: any) {
        super(props);

        // TODO: convert to Redux state (partly)?
        this.state = {
            calculation: { items: [] },
            isNewRowMode: false,
            originalCalculation: { items: [] },
        };

        this.handleAddNewRowClick = this.handleAddNewRowClick.bind(this);
        this.handleCancelNewRowClick = this.handleCancelNewRowClick.bind(this);
        this.handleCancelChangesClick = this.handleCancelChangesClick.bind(this);
        this.handleSaveNewRowClick = this.handleSaveNewRowClick.bind(this);
        this.handleSaveCalculation = this.handleSaveCalculation.bind(this);
    }

    public componentDidMount() {
        DataTransferManagerService.loadCalculation().then((result) => {
            this.setState((state, props) => ({
                calculation: this.cloneCalculation(result),
                originalCalculation: this.cloneCalculation(result),
            }));
        });
    }

    public render() {
        this.totalPlannedExpenses = this.state.calculation.items
            .filter((x) => !x.isPaid)
            .map((x) => x.sum)
            .reduce((a: number, b: number) => +a + +b, 0);

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
                            <CalculationNewRowComponent
                                handleCancelNewRowClick={this.handleCancelNewRowClick}
                                handleSaveNewRowClick={this.handleSaveNewRowClick} />
                        }
                        {this.state.calculation.items.map((item) =>
                            <CalculationRowComponent
                                key={item.id.toString()}
                                item={item}
                                handleRemoveRowClick={this.handleRemoveRowClick.bind(this, item.id)}
                                handleSwitchPaymentStatusClick={this.handleSwitchPaymentStatus.bind(this, item.id)}
                                isActive={this.state.activeRowId === item.id}
                                handleElementClick={this.handleCalculationRowClick.bind(this, item.id)}
                            />,
                        )}
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td colSpan={4}>{this.totalPlannedExpenses}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6}>
                                <div className="flex-container">
                                    <CancelButtonComponent handleClick={this.handleCancelChangesClick} />
                                    <button onClick={this.handleSaveCalculation}>Save</button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </React.Fragment >
        );
    }

    private cloneCalculation(calculation: ICalculation): ICalculation {
        const clonnedCalculation = { ...calculation };
        clonnedCalculation.items = this.cloneCalculationItems(calculation.items);
        return clonnedCalculation;
    }

    private cloneCalculationItems(items: ICalculationItem[]) {
        const clonnedItems: ICalculationItem[] = [];
        for (const item of items) {
            clonnedItems.push({ ...item });
        }
        return clonnedItems;
    }

    private handleAddNewRowClick(): void {
        this.setState((state, props) => ({
            isNewRowMode: true,
        }));
    }

    private handleCancelNewRowClick(): void {
        this.setState((state, props) => ({
            isNewRowMode: false,
        }));
    }

    private handleCancelChangesClick(): void {
        this.setState((state, props) => ({
            calculation: this.cloneCalculation(state.originalCalculation),
        }));
    }

    private handleRemoveRowClick(id: string): void {
        const fn = (st: ICalculationTableComponentState) => {
            const newArr = this.cloneCalculationItems(st.calculation.items);
            const itemIndex = newArr.findIndex((x) => x.id === id);
            newArr.splice(itemIndex, 1);
            return newArr;
        };

        this.setState((state, props) => ({
            calculation: {
                items: fn(state),
            },
        }));
    }

    private handleSwitchPaymentStatus(id: string): void {
        const fn = (st: ICalculationTableComponentState) => {
            const newArr = this.cloneCalculationItems(st.calculation.items);
            const itemIndex = newArr.findIndex((x) => x.id === id);
            newArr[itemIndex].isPaid = !newArr[itemIndex].isPaid;
            return newArr;
        };

        this.setState((state, props) => ({
            calculation: {
                items: fn(state),
            },
        }));
    }

    private handleSaveNewRowClick(item: ICalculationItem): void {
        const fn = (st: ICalculationTableComponentState) => {
            const newArr = this.cloneCalculationItems(st.calculation.items);
            newArr.push(item);
            return newArr;
        };

        this.setState((state, props) => ({
            calculation: {
                items: fn(state),
            },
            isNewRowMode: false,
        }));
    }

    private handleSaveCalculation(): void {
        DataTransferManagerService.saveCalculation(this.state.calculation).then(() => {
            this.setState((state, props) => ({
                originalCalculation: this.cloneCalculation(this.state.calculation),
            }));
        });
    }

    private handleCalculationRowClick(id: string): void {
        this.setState((state, props) => ({
            activeRowId: id,
        }));
    }
}
