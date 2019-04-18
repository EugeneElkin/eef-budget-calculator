import { Action, AnyAction } from "redux";

export enum ActionType {
    ACTIVATE_SIGNUP_TAB = 1,
    ACTIVATE_LOGIN_TAB,
}

export class AppActions {
    public static activateSignUpTabAction: () => Action<number> = () =>
    ({
        type: ActionType.ACTIVATE_SIGNUP_TAB,
    })

    public static activateLoginTabAction: () => Action<number> = () =>
    ({
        type: ActionType.ACTIVATE_LOGIN_TAB,
    })
}
