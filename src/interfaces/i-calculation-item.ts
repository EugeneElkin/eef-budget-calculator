export interface ICalculationItem {
    [index: string]: number | string | boolean;
    id: string;
    sum: number;
    aim: string;
    isPaid: boolean;
}
