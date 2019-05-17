import * as React from "react";

import { store } from "../";
import { ConnectedCalculationTableComponent } from "./calculation-table";
import { ConnectedDetailsFormComponent } from "./details-form";

export class PageComponent extends React.Component<{}> {
    public render() {
        return (
            <React.Fragment>
                <div className="grid-container">
                    <div className="calculation-grid-cell"><ConnectedCalculationTableComponent store={store} /></div>
                    <div className="details-grid-cell"><ConnectedDetailsFormComponent store={store} /></div>
                </div>
            </React.Fragment>
        );
    }
}
