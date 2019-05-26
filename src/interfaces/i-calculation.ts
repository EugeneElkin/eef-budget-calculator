import { ICalculationItem } from "./i-calculation-item";

export interface ICalculation {
    items: ICalculationItem[];
    availableSum: number;
}
