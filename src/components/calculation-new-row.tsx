import { v4 as uuid } from "uuid";

import { ICalculationItem } from "../interfaces/i-calculation-item";
import { IValueDescriptor } from "../interfaces/i-value-descriptor";
import { ValidationService } from "../services/validation-service";
import { CancelButtonComponent } from "./reusable/cancel-button";

import React = require("react");
export interface ICalculationNewRowComponentState {
    isValid: boolean;
    plannedSum: IValueDescriptor<string>;
    plannedAim: IValueDescriptor<string>;
}

export interface ICalculationNewRowComponentProps {
    handleCancelNewRowClick: () => void;
    handleSaveNewRowClick: (item: ICalculationItem) => void;
}

export class CalculationNewRowComponent extends React.Component<ICalculationNewRowComponentProps, ICalculationNewRowComponentState> {
    private isRequired: boolean = true;

    constructor(props: any) {
        super(props);

        this.state = {
            isValid: false,
            plannedAim: {
                isValid: false,
            },
            plannedSum: {
                isValid: false,
            },
        };

        this.handleSumWasChanged = this.handleSumWasChanged.bind(this);
        this.handleAimWasChanged = this.handleAimWasChanged.bind(this);
        this.handleFieldOnBlur = this.handleFieldOnBlur.bind(this);
    }

    public render() {
        return (
            <tr>
                <td></td>
                <td><CancelButtonComponent handleClick={this.props.handleCancelNewRowClick} /></td>
                <td><input
                    type={"text"}
                    placeholder="0,00"
                    value={this.state.plannedSum.value}
                    onChange={this.handleSumWasChanged}
                    onBlur={this.handleFieldOnBlur}
                    className={this.state.plannedSum.isValid ? "valid" : "invalid"}
                /></td>
                <td><input
                    type={"text"}
                    value={this.state.plannedAim.value}
                    onChange={this.handleAimWasChanged}
                    onBlur={this.handleFieldOnBlur}
                    className={this.state.plannedAim.isValid ? "valid" : "invalid"} /></td>
                <td></td>
                <td><button
                    disabled={!this.state.isValid}
                    onClick={() => this.props.handleSaveNewRowClick(this.buildCalculationItem())}
                >Ok</button></td>
            </tr>
        );
    }

    private handleSumWasChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.currentTarget.value;

        this.setState((state, props) => ({
            isValid: this.checkTotalValidation(state),
            plannedSum: ValidationService.validateMoneyFormat(value, state.plannedSum.value, this.isRequired),
        }), () => {
            this.setState((state, props) => ({
                isValid: this.checkTotalValidation(state),
            }));
        });
    }

    private handleAimWasChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.currentTarget.value;

        this.setState((state, props) => ({
            isValid: this.checkTotalValidation(state),
            plannedAim: ValidationService.validateRequired(value),
        }), () => {
            this.setState((state, props) => ({
                isValid: this.checkTotalValidation(state),
            }));
        });
    }

    private handleFieldOnBlur(): void {
        this.setState((state, props) => ({
            isValid: this.checkTotalValidation(state),
        }));
    }

    private checkTotalValidation(state: ICalculationNewRowComponentState) {
        if (state.plannedSum.isValid && state.plannedAim.isValid) {
            return true;
        }
        return false;
    }

    private buildCalculationItem(): ICalculationItem {
        const sum: number = parseFloat(this.state.plannedSum.value as string);
        return {
            aim: this.state.plannedAim.value as string,
            id: uuid(),
            isPaid: false,
            sum: isNaN(sum) ? 0 : sum,
        };
    }
}
