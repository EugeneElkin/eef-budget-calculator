import * as React from "react";
import { ICombinedReducersEntries } from "../state/reducers";
import { Dispatch, Action } from "redux";
import { connect } from "react-redux";
import { ICalculationItem } from "../interfaces/i-calculation-item";

interface IDetailsFormComponentProps {
    selectedCalculationItem?: ICalculationItem
}

interface IDetailsFormComponentHandlersWrapper {
    handlers: {};
}

interface IDetailsFormComponentDescriptor extends IDetailsFormComponentHandlersWrapper, IDetailsFormComponentProps {
}


class DetailsFormComponent extends React.Component<IDetailsFormComponentDescriptor> {
    public render() {
        return (
            <React.Fragment>
                {this.props.selectedCalculationItem &&
                    <React.Fragment>
                        <h2>Details</h2>
                        <div>{this.props.selectedCalculationItem.sum}</div>
                        <div>{this.props.selectedCalculationItem.aim}</div>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

const mapReduxStateToComponentProps: (state: ICombinedReducersEntries) => IDetailsFormComponentProps = (state) => {
    return {
        selectedCalculationItem: state ? state.appReducer.selectedCalculationItem : undefined
    };
};

const mapComponentEventsToReduxDispatches: (dispatch: Dispatch<Action<number>>) => IDetailsFormComponentHandlersWrapper =
    (dispatch) => {
        return {
            handlers: {
            },
        };
    };

export const ConnectedDetailsFormComponent: any = connect(
    mapReduxStateToComponentProps,
    mapComponentEventsToReduxDispatches,
)(DetailsFormComponent);
