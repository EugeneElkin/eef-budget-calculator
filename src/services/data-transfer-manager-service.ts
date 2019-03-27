import { ICalculation } from "../interfaces/i-calculation";

export class DataTransferManagerService {
    private static calculationKey: string = "calculation";

    constructor() { }

    public static saveCalculation(calculation: ICalculation): Promise<void> {
        return new Promise((resolve, reject) => {
            localStorage.setItem(this.calculationKey, JSON.stringify(calculation));
            resolve();
        });
    }

    public static loadCalculation(): Promise<ICalculation> {
        return new Promise((resolve, reject) => {
            let storedCalculation: ICalculation = { items: [] };

            try {
                const calculation: string | null = localStorage.getItem(this.calculationKey)
                if (calculation !== null) {
                    storedCalculation = JSON.parse(calculation);
                }
            } catch (ex) {
                // TODO: handle somehow to add then a notifying message
                reject();
            }

            resolve(storedCalculation);
        });
    }
}