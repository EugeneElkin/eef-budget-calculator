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
}

export const appActions = {
    addNewCalculationItem: (item: ICalculationItem) => ({
        type: AppActionType.ADD_NEW_CALCULATION_ITEM,
        value: item,
    }),
    cancelCalculationChanges: () => ({
        type: AppActionType.CANCEL_CALCULATION_CHANGES,
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
    selectCalculationItem: (id: string) => ({
        type: AppActionType.SELECT_CALCULATION_ITEM,
        value: id,
    }),
    switchItemPaymentStatus: (id: string) => ({
        type: AppActionType.SWITCH_CALCULATION_ITEM_PAYMENT_STATUS,
        value: id,
    }),
};
