import { IValueDescriptor } from "../interfaces/i-value-descriptor";

export class ValidationUtilsService {
    constructor() { }


    public static validateRequired<T>(checkingValue: T): IValueDescriptor<T> {
        let isvalid: boolean = true;

        if ((typeof checkingValue === "string" && this.hasWhiteSpacesOnlyOrEmpty(<string>checkingValue))
            || typeof checkingValue === "undefined"
            || checkingValue === null) {
            isvalid = false;
        }

        return {
            value: checkingValue,
            isValid: isvalid
        }
    }

    /**
     * Function validate {@link checkingValue} on number formats [0] or [0,00] for controlled textboxes.
     * If {@link checkingValue} is valid it will be returned back with valid state.
     * If {@link checkingValue} is invalid there will be returned result depends on {@link handleInvalidNumericValueForTextbox} function.
     * @param checkingValue the value that is necessery to check
     * @param previousValidValue the value that will be return if {@link checkingValue} is invalid
     * @param isRequired the sign that says that emty input is forbidden
     */
    public static validateMoneyFormat(
        checkingValue: string,
        previousValidValue?: string,
        isRequired?: boolean): IValueDescriptor<string> {

        const moneyRegexp: RegExp = /^[\d]{1,20}(\.){0,1}[\d]{0,2}$/;

        let isValid: boolean = checkingValue.search(moneyRegexp) >= 0;

        if (isValid) {
            return {
                value: checkingValue,
                isValid: true
            }
        }

        return this.handleInvalidNumericValueForTextbox(checkingValue, previousValidValue, isRequired);
    }

    /**
     * Function decides what to return instead of invalid value to prevent incorrect input in textbox with money format.
     * If {@link invalidValue} is empty it means that input was cleaned and it is kind of valid case for textbox  
     * Other cases ignore {@link invalidValue} but returns different results depends on {@link previousValidValue}
     * If {@link previousValidValue} is undefined it means that there wasn't any correct input
     * and {@link previousValidValue} cannot be just returned so "0" will be returned instead.
     * @param invalidValue 
     * @param previousValidValue 
     * @param isRequired the sign that says that emty input is forbidden
     */
    private static handleInvalidNumericValueForTextbox(
        invalidValue: string,
        previousValidValue?: string,
        isRequired?: boolean): IValueDescriptor<string> {

        if (invalidValue === "") {
            return {
                isValid: isRequired ? false : true
            };
        }

        if (typeof previousValidValue === "undefined") {
            return {
                value: "0",
                isValid: true
            }
        }

        return {
            value: previousValidValue,
            isValid: true
        }
    }

    private static hasWhiteSpacesOnlyOrEmpty(str: string): boolean {
        return /^\s{1,}$/g.test(str) || str === "";
    }
}