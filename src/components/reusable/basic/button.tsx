import * as React from "react";

export interface IButtonComponentComponentProps {
    handleClick?: () => void;
    className?: string;
}

export class ButtonComponent extends React.Component<IButtonComponentComponentProps, {}> {
    public render() {
        return (
            <button className={this.props.className} onClick={this.props.handleClick}>{this.props.children}</button>
        );
    }
}
