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

export class LoginActions {
    public static activateSignUpTabAction: () => IAppAction = () =>
        ({
            type: LoginActionType.ACTIVATE_SIGNUP_TAB,
        })

    public static activateLoginTabAction: () => IAppAction = () =>
        ({
            type: LoginActionType.ACTIVATE_LOGIN_TAB,
        })
}

export enum AppActionType {
    ENABLE_NEW_ROW_MODE = 10,
    DISABLE_NEW_ROW_MODE,
    ADD_NEW_CALCULATION_ITEM,
    SAVE_CALCULATION,
    CANCEL_CALCULATION_CHANGES,
    REMOVE_CALCULATION_ITEM,
}

export class AppActions {
    public static enableNewRowMode: () => IAppAction = () =>
        ({
            type: AppActionType.ENABLE_NEW_ROW_MODE,
        })

    public static disableNewRowMode: () => IAppAction = () =>
        ({
            type: AppActionType.DISABLE_NEW_ROW_MODE,
        })

    public static addNewCalculationItem: (item: ICalculationItem) => IAppAction = (item) =>
        ({
            type: AppActionType.ADD_NEW_CALCULATION_ITEM,
            value: item,
        })

    public static saveCalculation: (calculation: ICalculation) => IAppAction = (calculation) =>
        ({
            type: AppActionType.SAVE_CALCULATION,
            value: calculation,
        })

    public static cancelCalculationChanges: () => IAppAction = () =>
        ({
            type: AppActionType.CANCEL_CALCULATION_CHANGES,
        })

        public static rmoveCalculationItem: (id: string) => IAppAction = (id) => ({
            type: AppActionType.REMOVE_CALCULATION_ITEM,
            value: id,
        })
}
