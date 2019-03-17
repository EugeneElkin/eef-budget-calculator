import { ICalculation } from "../interfaces/i-calculation";

export class DataTransferManagerService {
    private static calculationKey: string = "calculation";

    constructor() { }

    public static saveCalculation(calculation: ICalculation): void {
        localStorage.setItem(this.calculationKey, JSON.stringify(calculation));
    }

    public static loadCalculation(): ICalculation {
        let storedCalculation: ICalculation = { items: []};

        try {
            const calculation: string | null = localStorage.getItem(this.calculationKey)
            if (calculation !== null) {
                storedCalculation = JSON.parse(calculation);    
            }
        } catch (ex) {
            // TODO: handle somehow to add then a notifying message
        }

        return storedCalculation;
    }
}