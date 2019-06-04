import * as React from "react";

import { ICalculationItem } from "../interfaces/i-calculation-item";
import { IValueDescriptor } from "../interfaces/i-value-descriptor";
import { ValidationService } from "../services/validation-service";
import { TextInputComponent } from "./reusable/text-input";

interface IComponentProps {
    selectedCalculationItem: ICalculationItem;
    handlers: IComponentHandlersWrapper;
}

interface IComponentHandlersWrapper {
    blurSumInput: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    blurAimInput: (id: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IComponentState {
    plannedSum: IValueDescriptor<string>;
    plannedAim: IValueDescriptor<string>;
    selectedItemId?: string;
}

export class DetailsFormCalculationItemComponent extends React.PureComponent<IComponentProps, IComponentState> {
    public static getDerivedStateFromProps(props: IComponentProps, state: IComponentState): any {
        const propsItemId: string | undefined = props.selectedCalculationItem ? props.selectedCalculationItem.id : undefined;
        // If another row was selected we must understand it and miss this case
        // because this case is actual only if we are still working with
        // the same row and must do nothing with the state.
        if (state && state.selectedItemId === propsItemId) {
            return state;
        } else if (props.selectedCalculationItem) {
            // When some row is selected we need to overwrite state from properties.
            // We cannot do it in constructor because component is rendering even if nothing is selected.
            return {
                plannedAim: {
                    isValid: true,
                    value: props.selectedCalculationItem.aim,
                },
                plannedSum: {
                    isValid: true,
                    value: props.selectedCalculationItem.sum ? props.selectedCalculationItem.sum.toString() : undefined,
                },
                selectedItemId: props.selectedCalculationItem.id,
            };
        }

        // Initial load case (when nothing is selected)
        return undefined;
    }

    constructor(props: any) {
        super(props);

        this.handleSumWasChanged = this.handleSumWasChanged.bind(this);
        this.handleAimWasChanged = this.handleAimWasChanged.bind(this);
    }

    public render() {
        return (
            <React.Fragment>
                <div>
                    <TextInputComponent
                        label={{
                            nameFor: "selectedItemSum",
                            text: "Planned Sum",
                        }}
                        value={this.state.plannedSum.value}
                        isValid={this.state.plannedSum.isValid}
                        changeHandler={this.handleSumWasChanged}
                        blurHandler={this.props.handlers.blurSumInput.bind(null, this.props.selectedCalculationItem.id)}
                    />
                </div>
                <br />
                <div>
                    <TextInputComponent
                        label={{
                            nameFor: "selectedItemAim",
                            text: "Planned aim",
                        }}
                        value={this.state.plannedAim.value}
                        isValid={this.state.plannedAim.isValid}
                        changeHandler={this.handleAimWasChanged}
                        blurHandler={this.props.handlers.blurAimInput.bind(null, this.props.selectedCalculationItem.id)}
                    />
                </div>
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
