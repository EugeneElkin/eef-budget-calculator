import * as React from "react";

export interface IButtonComponentComponentProps {
    handleClick?: () => void;
    className?: string;
}
export interface IButtonComponentComponentState {
}

export class ButtonComponent extends React.Component<IButtonComponentComponentProps, IButtonComponentComponentState> {
    render() {
        return (
            <button className={this.props.className} onClick={this.props.handleClick}>{this.props.children}</button>
        );
    }
}