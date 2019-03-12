import { Component, OnInit, Input } from "@angular/core";
import { ICalculationItem } from "../../interfaces/i-calculation-item";
import { EventManagerService } from "../../services/event-manager.service";

@Component({
    selector: "[app-calculation-row]",
    templateUrl: "calculation-row.component.html"
})
export class CalculationRowComponent implements OnInit {
    @Input() item: ICalculationItem;
    @Input() disabled: boolean;
    
    constructor(private eventManager: EventManagerService) { }

    ngOnInit() {
    }

    private switchToEditMode(id): void {
        this.eventManager.NotifyThatCalculationItemIsReadyToBeOpenedForEditing(id);
    }

    private remove(id: string): void {
        this.eventManager.NotifyThatCalculationItemIsReadyToBeRemoved(id);
    }

    private pay(id: string): void {
        this.eventManager.NotifyThatCalculationItemIsReadyToBePaid(id);
    }
}
