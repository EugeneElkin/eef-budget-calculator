import { AnyAction, combineReducers, Reducer } from "redux";

import { IAppProps } from "../types/appProps";
import { IAuthProps } from "../types/authProps";
import { ICombinedReducersEntries } from "../types/combinedReducersEntries";
import { ActionType } from "./actions";

const initialAppReducerState: IAppProps = {
    isLoginActive: true,
};

const appReducer: Reducer = (state: IAppProps = initialAppReducerState, action: AnyAction) => {
    switch (action.type) {
        case ActionType.ACTIVATE_SIGNUP_TAB:
            const result1 = {
                ...state,
                isLoginActive: false,
            };
            return result1;
        case ActionType.ACTIVATE_LOGIN_TAB:
            const result2 = {
                ...state,
                isLoginActive: true,
            };
            return result2;
        default:
            return state;
    }
};

const authReducer: Reducer = (state: IAuthProps, action: AnyAction) => {
    return state ? state : {};
};

export const rootReducer: Reducer<ICombinedReducersEntries> = combineReducers({
    appReducer,
    authReducer,
});
