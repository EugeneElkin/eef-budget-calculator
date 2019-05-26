import * as React from "react";

export interface ITextInputComponentComponentProps {
    changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    blurHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    isDisabled?: boolean;
    isValid?: boolean;
    label?: ITextInputLabelProps;
    placeholder?: string;
    value?: string | number;
}

export interface ITextInputLabelProps {
    text: string;
    nameFor: string;
}

export class TextInputComponent extends React.Component<ITextInputComponentComponentProps, {}> {
    public render() {
        const classNames: string[] = [(this.props.isValid ? "valid" : "invalid")];

        if (this.props.className) {
            classNames.push(this.props.className);
        }

        return (
            <React.Fragment>
                {this.props.label &&
                    <label htmlFor={this.props.label.nameFor}>{this.props.label.text}:</label>
                }
                <input
                    name={this.props.label ? this.props.label.nameFor : undefined}
                    type={"text"}
                    placeholder={this.props.placeholder ? this.props.placeholder : undefined}
                    value={this.props.value}
                    className={classNames.join(" ")}
                    onChange={this.props.changeHandler}
                    onBlur={this.props.isValid ? this.props.blurHandler : undefined}
                />
            </React.Fragment>
        );
    }
}
