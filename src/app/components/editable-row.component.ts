import { Component, OnInit, Input } from '@angular/core';
import { ICalculationItem } from '../interfaces/i-calculation-item';
import { EventManagerService } from '../services/event-manager.service';

@Component({
    selector: '[app-editable-row]',
    template: `
        <td></td>
        <td><button [disabled]="disabled">Ed</button></td>
        <td>{{item.sum}}</td>
        <td>{{item.aim}}</td>
        <td><input type="checkbox" [checked]="item.isPaid" (click)="pay(item.id)" [disabled]="disabled" /></td>
        <td><button class="remove" (click)="remove(item.id)" [disabled]="disabled">Rm</button></td>
  `
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
