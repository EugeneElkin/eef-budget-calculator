import React from "react";
import { v4 as uuid } from "uuid";

import { ICalculationItem } from "../interfaces/i-calculation-item";
import { IValueDescriptor } from "../interfaces/i-value-descriptor";
import { ValidationService } from "../services/validation-service";
import { CancelButtonComponent } from "./reusable/cancel-button";
import { TextInputComponent } from "./reusable/text-input";

export interface ICalculationNewRowComponentState {
    plannedSum: IValueDescriptor<string>;
    plannedAim: IValueDescriptor<string>;
}

export interface ICalculationNewRowComponentProps {
    handleCancelNewRowClick: () => void;
    handleSaveNewRowClick: (item: ICalculationItem) => void;
}

export class CalculationNewRowComponent extends React.Component<ICalculationNewRowComponentProps, ICalculationNewRowComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            plannedAim: {
                isValid: false,
            },
            plannedSum: {
                isValid: false,
            },
        };

        this.handleSumWasChanged = this.handleSumWasChanged.bind(this);
        this.handleAimWasChanged = this.handleAimWasChanged.bind(this);
    }

    public render() {
        return (
            <tr>
                <td></td>
                <td><CancelButtonComponent handleClick={this.props.handleCancelNewRowClick} /></td>
                <td>
                    <TextInputComponent
                        value={this.state.plannedSum.value}
                        placeholder={"0,00"}
                        isValid={this.state.plannedSum.isValid}
                        changeHandler={this.handleSumWasChanged}
                    />
                </td>
                <td>
                    <TextInputComponent
                        value={this.state.plannedAim.value}
                        isValid={this.state.plannedAim.isValid}
                        changeHandler={this.handleAimWasChanged}
                    />
                </td>
                <td></td>
                <td><button
                    disabled={!this.checkValidation(this.state)}
                    onClick={() => this.props.handleSaveNewRowClick(this.buildCalculationItem(this.state))}
                >Ok</button></td>
            </tr>
        );
    }

    private handleSumWasChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.currentTarget.value;

        this.setState((state, props) => ({
            plannedSum: ValidationService.validateMoneyFormat(value, state.plannedSum.value, true),
        }));
    }

    private handleAimWasChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.currentTarget.value;

        this.setState((state, props) => ({
            plannedAim: ValidationService.validateRequired(value),
        }));
    }

    private checkValidation(state: ICalculationNewRowComponentState) {
        if (state.plannedSum.isValid && state.plannedAim.isValid) {
            return true;
        }
        return false;
    }

    private buildCalculationItem(state: ICalculationNewRowComponentState): ICalculationItem {
        const sum: number = parseFloat(this.state.plannedSum.value as string);
        return {
            aim: state.plannedAim.value as string,
            id: uuid(),
            isPaid: false,
            sum: isNaN(sum) ? 0 : sum,
        };
    }
}
