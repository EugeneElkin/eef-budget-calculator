import { Reducer, combineReducers, AnyAction } from "redux";
import { ActionType } from "./actions";
import { AuthProps } from "../types/authProps";
import { AppProps } from "../types/appProps";
import { ICombinedReducersEntries } from "../types/combinedReducersEntries";

const initialAppReducerState: AppProps = {
    isLoginActive: true
  }

const appReducer: Reducer = (state: AppProps = initialAppReducerState, action: AnyAction) => {
    switch (action.type) {
        case ActionType.ACTIVATE_SIGNUP_TAB:
            const result1 = {
                ...state,
                isLoginActive: false
            };
            return result1;
        case ActionType.ACTIVATE_LOGIN_TAB:
            const result2 = {
                ...state,
                isLoginActive: true
            }
            return result2;
        default:
            return state;
    }
};

const authReducer: Reducer = (state: AuthProps, action: AnyAction) => {
    return state ? state : {};
}

export const rootReducer: Reducer<ICombinedReducersEntries> = combineReducers({
    authReducer,
    appReducer
})