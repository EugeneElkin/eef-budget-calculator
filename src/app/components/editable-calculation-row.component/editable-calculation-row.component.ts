import { Component, OnInit, Input } from "@angular/core";
import { EventManagerService } from "../../services/event-manager.service";
import { ICalculationItem } from "../../interfaces/i-calculation-item";
import { v4 as uuid } from "uuid";

@Component({
    selector: "[app-editable-calculation-row]",
    templateUrl: "editable-calculation-row.component.html",
})
export class EditableCalculationRowComponent implements OnInit {
    @Input() isNewItemMode: boolean = false;

    private model: ICalculationItem = {
        id: uuid(),
        sum: null,
        aim: null,
        isPaid: false
    };


    constructor(private eventManager: EventManagerService) { }

    ngOnInit() {
        console.log(this.isNewItemMode);
    }

    save(): void {
        this.eventManager.NotifyThatNewCalculationItemIsReadyToBeAdded(this.model);
    }

    cancel(): void {
        this.eventManager.NotifyThatNewCalculationItemIsReadyToBeCancelled();
    }

    isModelValid(): boolean {
        if (this.model.sum && this.model.aim && !isNaN(parseFloat(<any>this.model.sum))) {
            return true;
        }

        return false;
    }
}
