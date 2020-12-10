import React from "react";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";

import { ICalculation } from "../interfaces/i-calculation";
import { ICalculationItem } from "../interfaces/i-calculation-item";
import { DataTransferService } from "../services/data-transfer-service";
import { Actions } from "../state/actions";
import { ICombinedReducersEntries, showTotalsDetailsItemId } from "../state/reducers";
import { CalculationNewRowComponent } from "./calculation-new-row";
import { CalculationRowComponent } from "./calculation-row";
import { CancelButtonComponent } from "./reusable/cancel-button";
import { SaveButtonComponent } from "./reusable/save-button";

interface ICalculationComponentDescriptor extends ICalculationComponentHandlersWrapper, ICalculationComponentProps {
}

interface ICalculationComponentProps {
    isNewRowMode: boolean;
    calculation: ICalculation;
    originalCalculation: ICalculation;
    activeRowId?: string;
}

interface ICalculationComponentHandlersWrapper {
    handlers: ICalculationComponentHandlers;
}

interface ICalculationComponentHandlers {
    clickAddNewRow: () => void;
    clickCancelNewRow: () => void;
    clickCancelCalculationChanges: () => void;
    clickSaveCalculation: (calculation: ICalculation) => void;
    clickSaveNewRow: (item: ICalculationItem) => void;
    clickRemoveRow: (id: string, e: React.MouseEvent<HTMLButtonElement>) => void;
    clickSelectRow: (item: ICalculationItem) => void;
    clickSelectTotalsRow: () => void;
    clickSwitchPaymentStatus: (id: string, e: React.MouseEvent<HTMLInputElement>) => void;
    saveCalculation: (item: ICalculation) => void;
}

class CalculationTableComponent extends React.Component<ICalculationComponentDescriptor> {
    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        DataTransferService.loadCalculation().then((result) => {
            this.props.handlers.saveCalculation(result);
        });
    }

    public render() {
        const formatter: Intl.NumberFormat = new Intl.NumberFormat("ru-RU", {
            currency: "RUB",
            currencyDisplay: "code",
            style: "currency",
        });

        const totalPlannedExpenses: number = this.props.calculation.items
            .filter((x) => !x.isPaid)
            .map((x) => x.sum)
            .reduce((a: number, b: number) => +a + +b, 0);

        const balanceSum: number = this.props.calculation.availableSum - totalPlannedExpenses;

        return (
            <React.Fragment>
                <h2>Budget Calculation</h2>
                <table className="calculation-table">
                    <thead>
                        <tr>
                            <th style={{ width: "40px" }}>
                                <button
                                    onClick={this.props.handlers.clickAddNewRow}
                                    disabled={this.props.isNewRowMode}
                                >Add</button>
                            </th>
                            <th style={{ width: "60px" }}></th>
                            <th style={{ width: "90px" }}>Planned sum</th>
                            <th>Planned aim</th>
                            <th style={{ width: "40px" }}>Paid</th>
                            <th style={{ width: "40px" }}></th>
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
                                key={item.id}
                                item={item}
                                handleRemoveRowClick={this.props.handlers.clickRemoveRow.bind(null, item.id)}
                                handleSwitchPaymentStatusClick={this.props.handlers.clickSwitchPaymentStatus.bind(null, item.id)}
                                isActive={this.props.activeRowId === item.id}
                                isDisabled={this.props.isNewRowMode}
                                handleElementClick={this.props.isNewRowMode ? undefined : this.props.handlers.clickSelectRow.bind(null, item)}
                            />,
                        )}
                        <tr
                            className={(this.props.activeRowId === showTotalsDetailsItemId ? "is-active" : undefined)}
                            onClick={this.props.isNewRowMode ? undefined : this.props.handlers.clickSelectTotalsRow}
                        >
                            <td>Total</td>
                            <td></td>
                            <td colSpan={4}>
                                <span style={{ color: "green" }}>{formatter.format(this.props.calculation.availableSum)}</span> &#8722;&nbsp;
                                <span style={{ color: "red" }}>{formatter.format(totalPlannedExpenses)}</span> =&nbsp;
                                <span style={(balanceSum >= 0 ? { color: "green" } : { color: "red" })}>{formatter.format(balanceSum)}</span>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6}>
                                <div className="flex-container">
                                    <CancelButtonComponent
                                        handleClick={this.props.handlers.clickCancelCalculationChanges}
                                        isDisabled={this.props.isNewRowMode}
                                    />
                                    <SaveButtonComponent
                                        handleClick={this.props.handlers.clickSaveCalculation.bind(null, this.props.calculation)}
                                        isDisabled={this.props.isNewRowMode}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </React.Fragment >
        );
    }
}

const mapReduxStateToComponentProps: (state: ICombinedReducersEntries) => ICalculationComponentProps = (state) => {
    return {
        activeRowId: state ? (state.appReducer.selectedCalculationItem ? state.appReducer.selectedCalculationItem.id : undefined) : undefined,
        calculation: state ? state.appReducer.calculation : { items: [], availableSum: 0 },
        isNewRowMode: state ? state.appReducer.isNewRowMode : false,
        originalCalculation: state ? state.appReducer.originalCalculation : { items: [], availableSum: 0 },

    };
};

const mapComponentEventsToReduxDispatches: (dispatch: Dispatch<Action<number>>) => ICalculationComponentHandlersWrapper =
    (dispatch) => {
        return {
            handlers: {
                clickAddNewRow: () => {
                    dispatch(Actions.app.enableNewRowMode());
                },
                clickCancelCalculationChanges: () => {
                    dispatch(Actions.app.cancelCalculationChanges());
                },
                clickCancelNewRow: () => {
                    dispatch(Actions.app.disableNewRowMode());
                },
                clickRemoveRow: (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    dispatch(Actions.app.removeCalculationItem(id));
                },
                clickSaveCalculation: (calculation: ICalculation) => {
                    DataTransferService.saveCalculation(calculation).then(() => {
                        dispatch(Actions.app.saveCalculation(calculation));
                    });
                },
                clickSaveNewRow: (item: ICalculationItem) => {
                    dispatch(Actions.app.addNewCalculationItem(item));
                },
                clickSelectRow: (item: ICalculationItem) => {
                    dispatch(Actions.app.selectCalculationItem(item));
                },
                clickSelectTotalsRow: () => {
                    dispatch(Actions.app.selectTotalsItem());
                },
                clickSwitchPaymentStatus: (id: string, e: React.MouseEvent<HTMLInputElement>) => {
                    e.stopPropagation();
                    const value: boolean | undefined = e.currentTarget ? e.currentTarget.checked : undefined;
                    dispatch(Actions.app.switchItemPaymentStatus(id, value));
                },
                saveCalculation: (calculation: ICalculation) => {
                    dispatch(Actions.app.saveCalculation(calculation));
                },
            },
        };
    };

export const ConnectedCalculationTableComponent: any = connect(
    mapReduxStateToComponentProps,
    mapComponentEventsToReduxDispatches,
)(CalculationTableComponent);
