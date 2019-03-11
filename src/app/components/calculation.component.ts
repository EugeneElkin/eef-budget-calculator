import { Component, OnInit } from '@angular/core';
import { EventManagerService } from '../services/event-manager.service';
import { Subscription } from 'rxjs';
import { ICalculationItem } from '../interfaces/i-calculation-item';
import { DataTransferManagerService } from '../services/data-transfer-manager.service';
import { ICalculation } from '../interfaces/i-calculation';

@Component({
    selector: 'app-calculation',
    template: `
    <p>Calculation</p>
    <table class="calculation-table">
        <thead>
            <tr>
                <th><button (click)="enableNewRowMode()">Add</button></th>
                <th></th>
                <th>Planned sum</th>
                <th>Planned aim</th>
                <th>Paid</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr app-new-row *ngIf="isNewRowMode" class="new-record"></tr>
            <tr app-editable-row *ngFor="let item of calculation.items" [(item)]="item" [(disabled)]="isNewRowMode" [ngClass]="{'is-paid': item.isPaid}"></tr>
            <tr>
                <td>Total</td>
                <td><button>Ed</button></td>
                <td colspan="4">{{calculation.items | onlyIfPropFalse:'isPaid' | sumArray:'sum'}}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="6">
                    <div class="flex-container">
                        <button class="cancel" (click)="clearData()">Cancel</button>
                        <button (click)="saveCalculation()">Save</button>
                    </div>
                </td>
            </tr>
        </tfoot>
    </table>  
  `
})

export class CalculationComponent implements OnInit {
    private isNewRowMode: boolean = false;
    private subscriptionToCancel: Subscription;
    private subscriptionToAdd: Subscription;
    private subscriptionToRemove: Subscription;
    private subscriptionToPay: Subscription;
    private calculation: ICalculation = { items: [] };
    private totalSum: number = 0;

    constructor(private eventManager: EventManagerService, private dataTransferManager: DataTransferManagerService) {
        this.subscriptionToCancel = this.eventManager.newRowIsCancelled$.subscribe(
            () => {
                this.isNewRowMode = false;
            }
        );

        this.subscriptionToAdd = this.eventManager.newCalculationItemIsReady$.subscribe(
            (newItem: ICalculationItem) => {
                this.isNewRowMode = false;
                this.calculation.items = [...this.calculation.items, newItem];
            }
        );

        this.subscriptionToRemove = this.eventManager.calculationItemIsWaitingforRemoval$.subscribe(
            (id: string) => {
                const rmIndex = this.calculation.items.findIndex(x => x.id === id);
                const newArr = [...this.calculation.items];
                newArr.splice(rmIndex, 1);
                this.calculation.items = [...newArr]
            }
        )

        this.subscriptionToPay = this.eventManager.calculationItemIsReadyToBePaid$.subscribe(
            (id: string) => {
                const targetIndex = this.calculation.items.findIndex(x => x.id === id);
                const newArr = [...this.calculation.items];
                newArr[targetIndex].isPaid = !newArr[targetIndex].isPaid;
                this.calculation.items = [...newArr]
            }
        );
    }

    ngOnInit() {
        this.clearData()
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscriptionToCancel.unsubscribe();
        this.subscriptionToAdd.unsubscribe();
        this.subscriptionToRemove.unsubscribe();
        this.subscriptionToPay.unsubscribe();
    }

    private enableNewRowMode(): void {
        this.isNewRowMode = true;
    }

    private saveCalculation(): void {
        this.dataTransferManager.saveCalculation(
            {
                items: [...this.calculation.items]
            }
        );
        // TODO: Add notifying message
    }

    private clearData() {
        this.calculation = this.dataTransferManager.loadCalculation();
    }
}
