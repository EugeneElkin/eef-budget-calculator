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
    private subscriptionToCancel: Subscription;
    private subscriptionToAdd: Subscription;
    private subscriptionToRemove: Subscription;
    private subscriptionToPay: Subscription;
    private subscriptionToOpenEditMode: Subscription;
    private calculation: ICalculation = { items: [] };
    private isNewRowMode: boolean = false;
    private totalSum: number = 0;
    private editableItemId: string = null;

    constructor(private eventManager: EventManagerService, private dataTransferManager: DataTransferManagerService) {
        this.subscriptionToCancel = this.eventManager.newCalculationItemIsReadyToBeCancelled$.subscribe(
            () => {
                this.isNewRowMode = false;
            }
        );

        this.subscriptionToAdd = this.eventManager.newCalculationItemIsReadyToBeAdded$.subscribe(
            (newItem: ICalculationItem) => {
                this.isNewRowMode = false;
                this.calculation.items = [...this.calculation.items, newItem];
            }
        );

        this.subscriptionToRemove = this.eventManager.calculationItemIsReadyToBeRemoved$.subscribe(
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

        this.subscriptionToOpenEditMode = this.eventManager.calculationItemIsReadyToBeOpenedForEditing$.subscribe(
            (id: string) => {
                this.editableItemId = id;
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
        this.subscriptionToOpenEditMode.unsubscribe();
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
        this.editableItemId = null;
        this.isNewRowMode = false;
    }
}
