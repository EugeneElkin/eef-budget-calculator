export class ValidationUtilsService {
    constructor() { }

    /**
     * Validate {@link checkingValue} on number formats [0] or [0,00] for controlled textboxes.
     * If {@link checkingValue} is valid it will be returned back.
     * If {@link checkingValue} is invalid there will be returned {@link defaultValue}.
     * @param checkingValue the value that is necessery to check
     * @param defaultValue the value that will be return if {@link checkingValue} is invalid
     */
    public static validateMoneyFormat(checkingValue: string, defaultValue?: string): string | undefined {
        const moneyRegexp: RegExp = /^[\d]+(\.){0,1}[\d]{0,2}$/;

        let isValid: boolean = checkingValue.search(moneyRegexp) >= 0;

        if (isValid) {
            return checkingValue;
        }

        return this.handleInvalidNumericValueForTextbox(checkingValue, defaultValue);
    }

    /**
     * If {@link invalidValue} is empty it means that input was cleared and it is kind of valid case for textbox 
     * so, the function will return "undefined" to impose state to ignore empty input value 
     * @param invalidValue 
     * @param defaultValue 
     */
    public static handleInvalidNumericValueForTextbox(invalidValue: string, defaultValue?: string): string | undefined {
        if (invalidValue === "") {
            return undefined;
        }

        if (typeof defaultValue === "undefined") {
            return "0";
        }

        return defaultValue;
    }
}