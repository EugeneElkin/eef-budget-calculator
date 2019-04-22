import * as React from "react";
import { ConnectedCalculationTableComponent } from "./calculation-table";
import { DetailsFormComponent } from "./details-form";
import { store } from "..";

export class PageComponent extends React.Component<{}> {
    public render() {
        return (
            <React.Fragment>
                <ConnectedCalculationTableComponent store={store} />
                <DetailsFormComponent />
            </React.Fragment>
        );
    }
}
