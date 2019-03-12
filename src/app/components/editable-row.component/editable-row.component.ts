import { Component, OnInit, Input } from "@angular/core";
import { ICalculationItem } from "../../interfaces/i-calculation-item";
import { EventManagerService } from "../../services/event-manager.service";

@Component({
    selector: "[app-editable-row]",
    templateUrl: "editable-row.component.html"
})
export class EditableRowComponent implements OnInit {
    @Input() item: ICalculationItem;
    @Input() disabled: boolean;
    
    constructor(private eventManager: EventManagerService) { }

    ngOnInit() {
    }

    private remove(id: string): void {
        this.eventManager.removeCalculationItem(id);
    }

    private pay(id: string): void {
        this.eventManager.payCalculationItem(id);
    }
}
