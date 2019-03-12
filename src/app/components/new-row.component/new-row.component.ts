import { Component, OnInit } from "@angular/core";
import { EventManagerService } from "../../services/event-manager.service";
import { ICalculationItem } from "../../interfaces/i-calculation-item";
import { v4 as uuid } from "uuid";

@Component({
    selector: "[app-new-row]",
    templateUrl: "new-row.component.html",
})
export class NewRowComponent implements OnInit {
    private model: ICalculationItem = {
        id: uuid(),
        sum: null,
        aim: null,
        isPaid: false
    };

    constructor(private eventManager: EventManagerService) { }

    ngOnInit() {
    }

    save(): void {
        this.eventManager.addNewCalculationItem(this.model);
    }

    cancel(): void {
        this.eventManager.cancelNewRowAdding();
    }

    isModelValid(): boolean {
        if (this.model.sum && this.model.aim && !isNaN(parseFloat(<any>this.model.sum))) {
            return true;
        }

        return false;
    }
}
