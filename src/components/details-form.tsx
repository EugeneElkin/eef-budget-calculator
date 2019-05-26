import * as React from "react";
import { ICombinedReducersEntries } from "../state/reducers";
import { Dispatch, Action } from "redux";
import { connect } from "react-redux";
import { ICalculationItem } from "../interfaces/i-calculation-item";
import { TextInputComponent } from "./reusable/text-input";
import { IValueDescriptor } from "../interfaces/i-value-descriptor";
import { ValidationService } from "../services/validation-service";
import { appActions } from "../state/actions";

interface IDetailsFormComponentProps {
    selectedCalculationItem?: ICalculationItem
}

interface IDetailsFormComponentHandlersWrapper {
    handlers: {
        blurSumInput(componentState: IDetailsFormComponentState, event: React.ChangeEvent<HTMLInputElement>): void;
        blurAimInput(componentState: IDetailsFormComponentState, event: React.ChangeEvent<HTMLInputElement>): void;
    };
}

interface IDetailsFormComponentDescriptor extends IDetailsFormComponentHandlersWrapper, IDetailsFormComponentProps {
}

export interface IDetailsFormComponentState {
    selectedItemId?: string;
    plannedSum?: IValueDescriptor<string>;
    plannedAim?: IValueDescriptor<string>;
}

class DetailsFormComponent extends React.Component<IDetailsFormComponentDescriptor, IDetailsFormComponentState> {
    constructor(props: any) {
        super(props);

        this.handleSumWasChanged = this.handleSumWasChanged.bind(this);
        this.handleAimWasChanged = this.handleAimWasChanged.bind(this);
    }

    public static getDerivedStateFromProps(props: IDetailsFormComponentDescriptor, state: IDetailsFormComponentState): any {
        const propsItemId: string | undefined = props.selectedCalculationItem ? props.selectedCalculationItem.id : undefined;
        // If another row was selected we must understand it and miss this case
        // because this case is actual only if we are still working with
        // the same row and must do nothing with the state.
        if (state && state.selectedItemId === propsItemId) {
            return state;
        }
        // When some row is selected we need to overwrite state from properties.
        // We cannot do this in constructor because component is rendering even if nothing is selected.
        else if (props.selectedCalculationItem) {
            return {
                selectedItemId: props.selectedCalculationItem.id,
                plannedAim: {
                    isValid: true,
                    value: props.selectedCalculationItem.aim,
                },
                plannedSum: {
                    isValid: true,
                    value: props.selectedCalculationItem.sum ? props.selectedCalculationItem.sum.toString() : undefined,
                }
            };
        }

        // Initial load case (when nothing is selected)
        return undefined;
    };

    public render() {
        return (
            <React.Fragment>
                {this.props.selectedCalculationItem &&
                    <React.Fragment>
                        <h2>Details</h2>
                        <div>
                            <TextInputComponent
                                label={{
                                    text: "Planned Sum",
                                    nameFor: "selectedItemSum"
                                }}
                                value={this.state.plannedSum ? this.state.plannedSum.value : undefined}
                                isValid={this.state.plannedSum ? this.state.plannedSum.isValid : false}
                                changeHandler={this.handleSumWasChanged}
                                blurHandler={this.props.handlers.blurSumInput.bind(null, this.state)}
                            />
                        </div>
                        <br />
                        <div>
                            <TextInputComponent
                                label={{
                                    text: "Planned aim",
                                    nameFor: "selectedItemAim"
                                }}
                                value={this.state.plannedAim ? this.state.plannedAim.value : undefined}
                                isValid={this.state.plannedAim ? this.state.plannedAim.isValid : false}
                                changeHandler={this.handleAimWasChanged}
                                blurHandler={this.props.handlers.blurAimInput.bind(null, this.state)}
                            />
                        </div>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }

    private handleSumWasChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.currentTarget.value;

        this.setState((state, props) => ({
            plannedSum: ValidationService.validateMoneyFormat(value, (this.state.plannedSum ? this.state.plannedSum.value : undefined), true),
        }));
    }

    private handleAimWasChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.currentTarget.value;

        this.setState((state, props) => ({
            plannedAim: ValidationService.validateRequired(value),
        }));
    }
}

const mapReduxStateToComponentProps: (state: ICombinedReducersEntries) => IDetailsFormComponentProps = (state) => {
    return {
        selectedCalculationItem: state ? state.appReducer.selectedCalculationItem : undefined
    };
};

const mapComponentEventsToReduxDispatches: (dispatch: Dispatch<Action<number>>) => IDetailsFormComponentHandlersWrapper =
    (dispatch) => {
        return {
            handlers: {
                blurSumInput(componentState: IDetailsFormComponentState, event: React.ChangeEvent<HTMLInputElement>): void {
                    const newSum: string = event.currentTarget.value;
                    const isValid: boolean | undefined = componentState.plannedSum ? componentState.plannedSum.isValid : false;
                    if (isValid && componentState.selectedItemId) {
                        dispatch(appActions.changeCalcualtionItemProperty(componentState.selectedItemId, "sum", newSum));
                    }
                },
                blurAimInput(componentState: IDetailsFormComponentState, event: React.ChangeEvent<HTMLInputElement>): void {
                    const newAim: string = event.currentTarget.value;
                    const isValid: boolean | undefined = componentState.plannedAim ? componentState.plannedAim.isValid : false;
                    if (isValid && componentState.selectedItemId) {
                        dispatch(appActions.changeCalcualtionItemProperty(componentState.selectedItemId, "aim", newAim));
                    }
                }
            },
        };
    };

export const ConnectedDetailsFormComponent: any = connect(
    mapReduxStateToComponentProps,
    mapComponentEventsToReduxDispatches,
)(DetailsFormComponent);
