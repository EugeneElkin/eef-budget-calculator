import * as React from "react";
import { CalculationTableComponent } from "./calculation-table";

export interface IPageComponentDescriptor {
    
}

export class PageComponent extends React.Component<IPageComponentDescriptor> {
    render() {
        return (
            <CalculationTableComponent />
        )
    }
}