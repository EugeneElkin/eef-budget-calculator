import * as React from "react";

import { ICalculation } from "../interfaces/i-calculation";
import { ICalculationItem } from "../interfaces/i-calculation-item";
import { DataTransferManagerService } from "../services/data-transfer-manager-service";
import { CalculationNewRowComponent } from "./calculation-new-row";
import { CalculationRowComponent } from "./calculation-row";
import { CancelButtonComponent } from "./reusable/cancel-button";
import { SaveButtonComponent } from "./reusable/save-button";
import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import { AppActions } from "../state/actions";
import { ICombinedReducersEntries } from "../state/reducers";

export interface ICalculationTableComponentState {
    activeRowId?: string;
}

interface ICalculationComponentDescriptor extends ICalculationComponentHandlersWrapper, ICalculationComponentProps {
}

interface ICalculationComponentProps {
    isNewRowMode: boolean;
    calculation: ICalculation;
    originalCalculation: ICalculation;
}

interface ICalculationComponentHandlersWrapper {
    handlers: ICalculationComponentHandlers;
}

interface ICalculationComponentHandlers {
    clickAddNewRow: () => void;
    clickCancelNewRow: () => void;
    clickSaveNewRow: (item: ICalculationItem) => void;
    saveCalculation: (item: ICalculation) => void;
}

class CalculationTableComponent extends React.Component<ICalculationComponentDescriptor, ICalculationTableComponentState> {
    private totalPlannedExpenses: number = 0;

    constructor(props: any) {
        super(props);

        this.state = {};

        this.handleCancelChangesClick = this.handleCancelChangesClick.bind(this);
        this.handleSaveCalculation = this.handleSaveCalculation.bind(this);
    }

    public componentDidMount() {
        DataTransferManagerService.loadCalculation().then((result) => {
            this.props.handlers.saveCalculation(result);
        });
    }

    public render() {
        this.totalPlannedExpenses = this.props.calculation.items
            .filter((x) => !x.isPaid)
            .map((x) => x.sum)
            .reduce((a: number, b: number) => +a + +b, 0);

        return (
            <React.Fragment>
                <p>Calculation</p>
                <table className="calculation-table">
                    <thead>
                        <tr>
                            <th><button onClick={this.props.handlers.clickAddNewRow}>Add</button></th>
                            <th></th>
                            <th>Planned sum</th>
                            <th>Planned aim</th>
                            <th>Paid</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.isNewRowMode &&
                            <CalculationNewRowComponent
                                handleCancelNewRowClick={this.props.handlers.clickCancelNewRow}
                                handleSaveNewRowClick={this.props.handlers.clickSaveNewRow} />
                        }
                        {this.props.calculation.items.map((item) =>
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
                                    <SaveButtonComponent handleClick={this.handleSaveCalculation} />
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </React.Fragment >
        );
    }

    private handleCancelChangesClick(): void {
        // this.setState((state, props) => ({
        //     calculation: this.cloneCalculation(state.originalCalculation),
        // }));
    }

    private handleRemoveRowClick(id: string): void {
        // const fn = (st: ICalculationTableComponentState) => {
        //     const newArr = this.cloneCalculationItems(st.calculation.items);
        //     const itemIndex = newArr.findIndex((x) => x.id === id);
        //     newArr.splice(itemIndex, 1);
        //     return newArr;
        // };

        // this.setState((state, props) => ({
        //     calculation: {
        //         items: fn(state),
        //     },
        // }));
    }

    private handleSwitchPaymentStatus(id: string): void {
        // const fn = (st: ICalculationTableComponentState) => {
        //     const newArr = this.cloneCalculationItems(st.calculation.items);
        //     const itemIndex = newArr.findIndex((x) => x.id === id);
        //     newArr[itemIndex].isPaid = !newArr[itemIndex].isPaid;
        //     return newArr;
        // };

        // this.setState((state, props) => ({
        //     calculation: {
        //         items: fn(state),
        //     },
        // }));
    }

    private handleSaveCalculation(): void {
        // DataTransferManagerService.saveCalculation(this.props.calculation).then(() => {
        //     this.setState((state, props) => ({
        //         originalCalculation: this.cloneCalculation(this.state.calculation),
        //     }));
        // });
    }

    private handleCalculationRowClick(id: string): void {
        this.setState((state, props) => ({
            activeRowId: id,
        }));
    }
}

const mapReduxStateToComponentProps: (state: ICombinedReducersEntries) => ICalculationComponentProps = (state) => {
    return {
        isNewRowMode: state ? state.appReducer.isNewRowMode : false,
        calculation: state ? state.appReducer.calculation : { items: [] },
        originalCalculation: state ? state.appReducer.originalCalculation : { items: [] },
    }
};

const mapComponentEventsToReduxDispatches: (dispatch: Dispatch<Action<number>>) => ICalculationComponentHandlersWrapper = dispatch => {
    return {
        handlers: {
            clickAddNewRow: () => {
                dispatch(AppActions.enableNewRowMode())
            },
            clickCancelNewRow: () => {
                dispatch(AppActions.disableNewRowMode())
            },
            clickSaveNewRow: (item: ICalculationItem) => {
                dispatch(AppActions.addNewCalculationItem(item))
            },
            saveCalculation: (item: ICalculation) => {
                dispatch(AppActions.saveCalculation(item))
            },
        }
    }
}

export const ConnectedCalculationTableComponent: any = connect(
    mapReduxStateToComponentProps,
    mapComponentEventsToReduxDispatches
)(CalculationTableComponent);
