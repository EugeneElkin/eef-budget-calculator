import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sumArray'
})
export class SumArrayPipe implements PipeTransform {

    transform(items: number[], prop: string): any {
        if (prop) {
            return items.reduce((a, b) => +a + +b[prop], 0);
        }
        
        return items.reduce((a, b) => +a + +b, 0);
    }

}
