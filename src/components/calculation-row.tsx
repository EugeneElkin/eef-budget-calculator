import React from "react";
import { ICalculationItem } from "../interfaces/i-calculation-item";

export interface ICalculationRowComponentProps {
    item: ICalculationItem;
    handleRemoveRowClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleSwitchPaymentStatusClick: (e: React.MouseEvent<HTMLInputElement>) => void;
    handleElementClick?: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
}

export class CalculationRowComponent extends React.Component<ICalculationRowComponentProps> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const classNames: string[] = [];

        if (this.props.item.isPaid) {
            classNames.push("is-paid");
        }

        if (this.props.isActive) {
            classNames.push("is-active");
        }

        const formatter: Intl.NumberFormat = new Intl.NumberFormat("ru-RU", {
            currency: "RUB",
            currencyDisplay: "code",
            style: "currency",
        });

        return (
            <tr
                className={classNames.length > 0 ? classNames.join(" ") : undefined}
                onClick={this.props.handleElementClick} >
                <td></td>
                <td></td>
                <td>{formatter.format(this.props.item.sum)}</td>
                <td>{this.props.item.aim}</td>
                <td>
                    <input type="checkbox"
                        checked={this.props.item.isPaid}
                        onClick={this.props.handleSwitchPaymentStatusClick}
                        disabled={this.props.isDisabled}
                    />
                </td>
                <td>
                    <button
                        className="remove"
                        disabled={this.props.isDisabled}
                        onClick={this.props.handleRemoveRowClick}
                    >Rm</button>
                </td>
            </tr>
        );
    }
}
