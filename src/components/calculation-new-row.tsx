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
    }

    handleSumWasChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.currentTarget.value;

        this.setState((state, props) => ({
            plannedSum: ValidationUtilsService.validateMoneyFormat(value, state.plannedSum.value, true)
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
                    className={this.state.plannedSum.isValid ? "valid" : "invalid"}
                /></td>
                <td><input itemType={"text"} value={this.state.plannedAim.value} /></td>
                <td></td>
                <td><button disabled={!this.state.isValid}>Ok</button></td>
            </tr>
        );
    }
}