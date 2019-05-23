import * as React from "react";

export interface IButtonComponentComponentProps {
    handleClick?: (param?: any) => void;
    className?: string;
    isDisabled?: boolean;
}

export class ButtonComponent extends React.Component<IButtonComponentComponentProps, {}> {
    public render() {
        return (
            <button
                className={this.props.className}
                onClick={this.props.handleClick}
                disabled={this.props.isDisabled}
            >{this.props.children}</button>
        );
    }
}
