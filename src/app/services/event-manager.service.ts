import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICalculationItem } from '../interfaces/i-calculation-item';

@Injectable({
    providedIn: 'root'
})
export class EventManagerService {
    constructor() { }

    newCalculationItemIsReadyToBeCancelled$ = new Subject();
    newCalculationItemIsReadyToBeAdded$ = new Subject();
    calculationItemIsReadyToBeRemoved$ = new Subject();
    calculationItemIsReadyToBePaid$ = new Subject();
    calculationItemIsReadyToBeOpenedForEditing$ = new Subject();

    public NotifyThatNewCalculationItemIsReadyToBeCancelled(): void {
        this.newCalculationItemIsReadyToBeCancelled$.next();
    }

    public NotifyThatNewCalculationItemIsReadyToBeAdded(calculationItem: ICalculationItem): void {
        this.newCalculationItemIsReadyToBeAdded$.next(calculationItem);
    }

    public NotifyThatCalculationItemIsReadyToBeRemoved(id: string): void {
        this.calculationItemIsReadyToBeRemoved$.next(id);
    }

    public NotifyThatCalculationItemIsReadyToBePaid(id: string): void {
        this.calculationItemIsReadyToBePaid$.next(id);
    }

    public NotifyThatCalculationItemIsReadyToBeOpenedForEditing(id: string): void {
        this.calculationItemIsReadyToBeOpenedForEditing$.next(id);
    }
}
