import { Component, OnInit } from "@angular/core";
import { EventManagerService } from "../../services/event-manager.service";
import { Subscription } from "rxjs";
import { ICalculationItem } from "../../interfaces/i-calculation-item";
import { DataTransferManagerService } from "../../services/data-transfer-manager.service";
import { ICalculation } from "../../interfaces/i-calculation";

@Component({
    selector: "app-calculation",
    templateUrl: "calculation.component.html"
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
