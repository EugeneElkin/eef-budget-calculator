import { Action, AnyAction } from "redux";

export enum ActionType {
    ACTIVATE_SIGNUP_TAB = 1,
    ACTIVATE_LOGIN_TAB
};

export class AppActions {
    static activateSignUpTabAction: () => Action<number> = () => 
    ({
        type: ActionType.ACTIVATE_SIGNUP_TAB
    });

    static activateLoginTabAction: () => Action<number> = () =>
    ({
        type: ActionType.ACTIVATE_LOGIN_TAB
    });

}