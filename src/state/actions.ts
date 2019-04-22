import { Action, AnyAction } from "redux";
import { ICalculationItem } from "../interfaces/i-calculation-item";
import { ICalculation } from "../interfaces/i-calculation";

export interface IAppAction extends Action<number> {
    value?: any
}

export enum AppActionType {
    ACTIVATE_SIGNUP_TAB = 1,
    ACTIVATE_LOGIN_TAB,
    ENABLE_NEW_ROW_MODE,
    DISABLE_NEW_ROW_MODE,
    ADD_NEW_CALCULATION_ITEM,
    SAVE_CALCULATION,
}

export class AppActions {
    public static activateSignUpTabAction: () => IAppAction = () =>
        ({
            type: AppActionType.ACTIVATE_SIGNUP_TAB,
        })

    public static activateLoginTabAction: () => IAppAction = () =>
        ({
            type: AppActionType.ACTIVATE_LOGIN_TAB,
        })

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
}
