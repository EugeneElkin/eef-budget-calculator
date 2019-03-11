import { Injectable } from '@angular/core';
import { ICalculation } from '../interfaces/i-calculation';

@Injectable({
    providedIn: 'root'
})
export class DataTransferManagerService {
    private calculationKey: string = "calculation";

    constructor() { }

    public saveCalculation(calculation: ICalculation): void {
        localStorage.setItem(this.calculationKey, JSON.stringify(calculation));
    }

    public loadCalculation(): ICalculation {
        let storedCalculation: ICalculation = null;

        try {
            storedCalculation = JSON.parse(localStorage.getItem(this.calculationKey));
        } catch (ex) {
            // TODO: add notifying message
        }

        return storedCalculation;
    }
}
