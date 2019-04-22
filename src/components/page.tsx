import * as React from "react";

import { store } from "../";
import { ConnectedCalculationTableComponent } from "./calculation-table";
import { DetailsFormComponent } from "./details-form";

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
