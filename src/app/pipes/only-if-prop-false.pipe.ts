import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'onlyIfPropFalse'
})
export class OnlyIfPropFalsePipe implements PipeTransform {
    transform(items: any[], prop: string): any {
        const filteredItems = items.filter(x => x[prop] === false);
        return [...filteredItems];
    }
}
