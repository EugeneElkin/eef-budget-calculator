import React from "react";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";

import { ICalculationItem } from "../interfaces/i-calculation-item";
import { Actions } from "../state/actions";
import { ICombinedReducersEntries, showTotalsDetailsItemId } from "../state/reducers";
import { DetailsFormCalculationItemComponent } from "./details-form-calculation-item";
import { DetailsFormTotalsComponent } from "./details-form-totals";

interface IComponentProps {
    selectedCalculationItem?: ICalculationItem;
}

interface IComponentHandlers {
    handlers: {
        blurSumInput: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
        blurAimInput: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
        blurAvailableSumInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };
}

interface IComponentDescriptor extends IComponentHandlers, IComponentProps {
}

class DetailsFormComponent extends React.Component<IComponentDescriptor, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <React.Fragment>
                {this.props.selectedCalculationItem
                    && this.props.selectedCalculationItem.id !== showTotalsDetailsItemId &&
                    <React.Fragment>
                        <h2>Details</h2>
                        <DetailsFormCalculationItemComponent
                            selectedCalculationItem={this.props.selectedCalculationItem}
                            handlers={{
                                blurAimInput: this.props.handlers.blurAimInput,
                                blurSumInput: this.props.handlers.blurSumInput,
                            }}
                        />
                    </React.Fragment>
                }
                {this.props.selectedCalculationItem
                    && this.props.selectedCalculationItem.id === showTotalsDetailsItemId &&
                    <React.Fragment>
                        <h2>Details</h2>
                        <DetailsFormTotalsComponent
                            sum={this.props.selectedCalculationItem.sum.toString()}
                            handlers={{
                                blurSumInput: this.props.handlers.blurAvailableSumInput,
                            }}
                        />
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

const mapReduxStateToComponentProps: (state: ICombinedReducersEntries) => IComponentProps = (state) => {
    return {
        selectedCalculationItem: state ? state.appReducer.selectedCalculationItem : undefined,
    };
};

const mapComponentEventsToReduxDispatches: (dispatch: Dispatch<Action<number>>) => IComponentHandlers =
    (dispatch) => {
        return {
            handlers: {
                blurSumInput(id: string, event: React.ChangeEvent<HTMLInputElement>): void {
                    const newSum: string = event.currentTarget.value;
                    dispatch(Actions.app.changeCalcualtionItemProperty(id, "sum", newSum));
                },
                blurAimInput(id: string, event: React.ChangeEvent<HTMLInputElement>): void {
                    const newAim: string = event.currentTarget.value;
                    dispatch(Actions.app.changeCalcualtionItemProperty(id, "aim", newAim));
                },
                blurAvailableSumInput(event: React.ChangeEvent<HTMLInputElement>): void {
                    const newAvailableSum: string = event.currentTarget.value;
                    dispatch(Actions.app.changeCalcualtionAvailableSum(newAvailableSum));
                },
            },
        };
    };

export const ConnectedDetailsFormComponent: any = connect(
    mapReduxStateToComponentProps,
    mapComponentEventsToReduxDispatches,
)(DetailsFormComponent);
