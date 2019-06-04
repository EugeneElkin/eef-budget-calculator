import React = require("react");
import { IValueDescriptor } from "../interfaces/i-value-descriptor";
import { ValidationService } from "../services/validation-service";
import { TextInputComponent } from "./reusable/text-input";

interface IComponentState {
    sum: IValueDescriptor<string>;
}

interface IComponentProps {
    sum: string;
    handlers: IComponentHandlersWrapper;
}

interface IComponentHandlersWrapper {
    blurSumInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class DetailsFormTotalsComponent extends React.Component<IComponentProps, IComponentState> {
    constructor(props: any) {
        super(props);

        this.handleSumWasChanged = this.handleSumWasChanged.bind(this);

        this.state = {
            sum: {
                isValid: true,
                value: this.props.sum,
            },
        };
    }

    public render() {
        return (
            <React.Fragment>
                <div>
                    <TextInputComponent
                        label={{
                            nameFor: "availableSum",
                            text: "Available Sum",
                        }}
                        value={this.state.sum.value}
                        isValid={this.state.sum.isValid}
                        changeHandler={this.handleSumWasChanged}
                        blurHandler={this.props.handlers.blurSumInput}
                    />
                </div>
            </React.Fragment>
        );
    }

    private handleSumWasChanged(event: React.ChangeEvent<HTMLInputElement>): void {
        const value: string = event.currentTarget.value;

        this.setState((state, props) => ({
            sum: ValidationService.validateMoneyFormat(value, this.state.sum.value, true),
        }));
    }
}
