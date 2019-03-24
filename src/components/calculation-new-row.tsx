import React = require("react");
import { CancelButtonComponent } from "./reusable/cancel-button";
import { ValidationUtilsService } from "../services/validation-utils-service";

export interface ICalculationNewRowComponentState {
    isValid: boolean;
    plannedSum?: string;
    plannedAim?: string;
}

export interface ICalculationNewRowComponentProps {
    handleCancelNewRowClick: () => void;
}

export class CalculationNewRowComponent extends React.Component<ICalculationNewRowComponentProps, ICalculationNewRowComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            isValid: false
        }

        this.handleSumWasChanged = this.handleSumWasChanged.bind(this);
    }

    handleSumWasChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.currentTarget.value;

        this.setState((state, props) => ({
            plannedSum: ValidationUtilsService.validateMoneyFormat(value, state.plannedSum)
        }), () => {
            console.log(this.state.plannedSum);
        });
    }

    render() {
        return (
            <tr>
                <td></td>
                <td><CancelButtonComponent handleClick={this.props.handleCancelNewRowClick} /></td>
                <td><input itemType={"text"} placeholder="0,00" value={this.state.plannedSum} onChange={this.handleSumWasChanged} /></td>
                <td><input itemType={"text"} value={this.state.plannedAim} /></td>
                <td></td>
                <td><button disabled={!this.state.isValid}>Ok</button></td>
            </tr>
        );
    }
}