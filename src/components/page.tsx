import * as React from "react";
import { CalculationTableComponent } from "./calculation-table";
import { DetailsFormComponent } from "./details-form";

export class PageComponent extends React.Component<{}> {
    public render() {
        return (
            <React.Fragment>
                <CalculationTableComponent />
                <DetailsFormComponent />
            </React.Fragment>
        );
    }
}
