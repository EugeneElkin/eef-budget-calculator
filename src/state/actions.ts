import { Action, AnyAction } from "redux";

import { ICalculation } from "../interfaces/i-calculation";
import { ICalculationItem } from "../interfaces/i-calculation-item";

export interface IAppAction extends Action<number> {
    value?: any;
}

export enum LoginActionType {
    ACTIVATE_SIGNUP_TAB = 1,
    ACTIVATE_LOGIN_TAB,
}

export const loginActions = {
    activateLoginTabAction: () => ({
        type: LoginActionType.ACTIVATE_LOGIN_TAB,
    }),
    activateSignUpTabAction: () => ({
        type: LoginActionType.ACTIVATE_SIGNUP_TAB,
    }),
};

export enum AppActionType {
    ENABLE_NEW_ROW_MODE = 10,
    DISABLE_NEW_ROW_MODE,
    ADD_NEW_CALCULATION_ITEM,
    SAVE_CALCULATION,
    CANCEL_CALCULATION_CHANGES,
    REMOVE_CALCULATION_ITEM,
    SELECT_CALCULATION_ITEM,
    SWITCH_CALCULATION_ITEM_PAYMENT_STATUS,
    CHANGE_CALCULATION_ITEM_PROPERTY,
}

export const appActions = {
    addNewCalculationItem: (item: ICalculationItem) => ({
        type: AppActionType.ADD_NEW_CALCULATION_ITEM,
        value: item,
    }),
    cancelCalculationChanges: () => ({
        type: AppActionType.CANCEL_CALCULATION_CHANGES,
    }),
    changeCalcualtionItemProperty: (id: string, propName: string, propVal: any) => ({
        type: AppActionType.CHANGE_CALCULATION_ITEM_PROPERTY,
        value: {
            itemId: id,
            propName: propName,
            propVal: propVal,
        },
    }),
    disableNewRowMode: () => ({
        type: AppActionType.DISABLE_NEW_ROW_MODE,
    }),
    enableNewRowMode: () => ({
        type: AppActionType.ENABLE_NEW_ROW_MODE,
    }),
    removeCalculationItem: (id: string) => ({
        type: AppActionType.REMOVE_CALCULATION_ITEM,
        value: id,
    }),
    saveCalculation: (calculation: ICalculation) => ({
        type: AppActionType.SAVE_CALCULATION,
        value: calculation,
    }),
    selectCalculationItem: (item: ICalculationItem) => ({
        type: AppActionType.SELECT_CALCULATION_ITEM,
        value: item,
    }),
    switchItemPaymentStatus: (id: string, value?: boolean) => ({
        type: AppActionType.SWITCH_CALCULATION_ITEM_PAYMENT_STATUS,
        value: {
            id: id,
            flagStatus: value,
        },
    }),
};
