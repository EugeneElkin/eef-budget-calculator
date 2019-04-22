import { ICalculation } from "../interfaces/i-calculation";
import { ICalculationItem } from "../interfaces/i-calculation-item";

export class DataMutationService {
    public static cloneCalculation(calculation: ICalculation): ICalculation {
        const clonnedCalculation = { ...calculation };
        clonnedCalculation.items = this.cloneCalculationItems(calculation.items);
        return clonnedCalculation;
    }

    public static cloneCalculationItems(items: ICalculationItem[]): ICalculationItem[] {
        const clonnedItems: ICalculationItem[] = [];
        for (const item of items) {
            clonnedItems.push({ ...item });
        }
        return clonnedItems;
    }

    public static addNewItemInCalculation(calculation: ICalculation, item: ICalculationItem): ICalculation {
        const newCalculation = this.cloneCalculation(calculation);
        newCalculation.items.push(item);
        return newCalculation;
    }

    public static removeItemFromCalculation(calculation: ICalculation, id: string): ICalculation {
        const newArr = this.cloneCalculationItems(calculation.items);
        const itemIndex = newArr.findIndex((x) => x.id === id);
        if (itemIndex === -1) {
            return calculation;
        }
        newArr.splice(itemIndex, 1);
        calculation.items = newArr;
        return calculation;
    }
}
