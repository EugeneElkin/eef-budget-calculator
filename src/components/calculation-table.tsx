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
    activeRowId?: string;
}

export class CalculationTableComponent extends React.Component<ICalculationTableComponentProps, ICalculationTableComponentState> {
    totalPlannedExpenses: number = 0;

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
        this.handleSaveNewRowClick = this.handleSaveNewRowClick.bind(this);
        this.handleSaveCalculation = this.handleSaveCalculation.bind(this);
    }

    private cloneCalculation(calculation: ICalculation): ICalculation {
        let clonnedCalculation = { ...calculation };
        clonnedCalculation.items = this.cloneCalculationItems(calculation.items)
        return clonnedCalculation;
    }

    private cloneCalculationItems(items: ICalculationItem[]) {
        let clonnedItems: ICalculationItem[] = []
        for (let i = 0; i < items.length; i++) {
            clonnedItems.push({ ...items[i] });
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

    handleSaveNewRowClick(item: ICalculationItem): void {
        const fn = (st: ICalculationTableComponentState) => {
            const newArr = this.cloneCalculationItems(st.calculation.items);
            newArr.push(item);
            return newArr;
        }

        this.setState((state, props) => ({
            calculation: {
                items: fn(state)
            },
            isNewRowMode: false
        }));
    }

    handleSaveCalculation(): void {
        DataTransferManagerService.saveCalculation(this.state.calculation).then(() => {
            this.setState((state, props) => ({
                originalCalculation: this.cloneCalculation(this.state.calculation)
            }));
        });
    }

    handleCalculationRowClick(id: string): void {
        this.setState((state, props) => ({
            activeRowId: id
        }));
    }

    render() {
        this.totalPlannedExpenses = this.state.calculation.items
            .filter(x => !x.isPaid)
            .map(x => x.sum)
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
                                handleElementClick={this.handleCalculationRowClick.bind(this, item.id)} />
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
}
