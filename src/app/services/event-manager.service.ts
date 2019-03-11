import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICalculationItem } from '../interfaces/i-calculation-item';

@Injectable({
    providedIn: 'root'
})
export class EventManagerService {
    constructor() { }

    newRowIsCancelled$ = new Subject();
    newCalculationItemIsReady$ = new Subject();
    calculationItemIsWaitingforRemoval$ = new Subject();
    calculationItemIsReadyToBePaid$ = new Subject();

    public cancelNewRowAdding(): void {
        this.newRowIsCancelled$.next();
    }

    public addNewCalculationItem(calculationItem: ICalculationItem): void {
        this.newCalculationItemIsReady$.next(calculationItem);
    }

    public removeCalculationItem(id: string): void {
        this.calculationItemIsWaitingforRemoval$.next(id);
    }

    public payCalculationItem(id: string): void {
        this.calculationItemIsReadyToBePaid$.next(id);
    }
}
