import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'onlyIfPropTrue'
})
export class OnlyIfPropTruePipe implements PipeTransform {
    transform(items: any[], prop: string): any {
        const filteredItems = items.filter(x => x[prop] === true);
        return [...filteredItems];
    }
}
