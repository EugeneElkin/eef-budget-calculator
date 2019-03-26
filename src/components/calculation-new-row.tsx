import React = require("react");
import { CancelButtonComponent } from "./reusable/cancel-button";
import { ValidationUtilsService } from "../services/validation-utils-service";
import { IValueDescriptor } from "../interfaces/i-value-descriptor";

export interface ICalculationNewRowComponentState {
    isValid: boolean;
    plannedSum: IValueDescriptor<string>;
    plannedAim: IValueDescriptor<string>;
}

export interface ICalculationNewRowComponentProps {
    handleCancelNewRowClick: () => void;
}

export class CalculationNewRowComponent extends React.Component<ICalculationNewRowComponentProps, ICalculationNewRowComponentState> {
    private isRequired: boolean = true;

    constructor(props: any) {
        super(props);

        this.state = {
            isValid: false,
            plannedSum: {
                isValid: false
            },
            plannedAim: {
                isValid: false
            }
        }

        this.handleSumWasChanged = this.handleSumWasChanged.bind(this);
        this.handleAimWasChanged = this.handleAimWasChanged.bind(this);
        this.handleFieldOnBlur = this.handleFieldOnBlur.bind(this);
    }

    handleSumWasChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.currentTarget.value;

        this.setState((state, props) => ({
            plannedSum: ValidationUtilsService.validateMoneyFormat(value, state.plannedSum.value, this.isRequired),
            isValid: this.checkTotalValidation(state)
        }), () => {
            this.setState((state, props) => ({
                isValid: this.checkTotalValidation(state)
            }));
        });
    }

    handleAimWasChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.currentTarget.value;

        this.setState((state, props) => ({
            plannedAim: ValidationUtilsService.validateRequired(value),
            isValid: this.checkTotalValidation(state)
        }), () => {
            this.setState((state, props) => ({
                isValid: this.checkTotalValidation(state)
            }));
        });
    }

    handleFieldOnBlur(): void {
        this.setState((state, props) => ({
            isValid: this.checkTotalValidation(state)
        }));
    }

    render() {
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
                <td><button disabled={!this.state.isValid}>Ok</button></td>
            </tr>
        );
    }

    private checkTotalValidation(state: ICalculationNewRowComponentState) {
        if (state.plannedSum.isValid && state.plannedAim.isValid) {
            return true;
        }
        return false;
    }
}