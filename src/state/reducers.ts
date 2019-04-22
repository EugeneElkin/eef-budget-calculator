import { combineReducers, Reducer } from "redux";

import { ICalculation } from "../interfaces/i-calculation";
import { DataMutationService } from "../services/data-mutation-service";
import { AppActionType, IAppAction, LoginActionType } from "./actions";

interface IAppReduxState {
    isLoginActive?: boolean | null;
    isNewRowMode: boolean;
    calculation: ICalculation;
    originalCalculation: ICalculation;
}

interface IAuthReduxState {
    isAuthenticated: boolean;
}

export interface ICombinedReducersEntries {
    authReducer: IAuthReduxState;
    appReducer: IAppReduxState;
}

const initialAppReducerState: IAppReduxState = {
    calculation: { items: [] },
    isLoginActive: true,
    isNewRowMode: false,
    originalCalculation: { items: [] },
};

const appReducer: Reducer = (state: IAppReduxState = initialAppReducerState, action: IAppAction) => {
    switch (action.type) {
        case LoginActionType.ACTIVATE_SIGNUP_TAB:
            return {
                ...state,
                isLoginActive: false,
            };
        case LoginActionType.ACTIVATE_LOGIN_TAB:
            return {
                ...state,
                isLoginActive: true,
            };
        case AppActionType.ENABLE_NEW_ROW_MODE:
            return {
                ...state,
                isNewRowMode: true,
            };
        case AppActionType.DISABLE_NEW_ROW_MODE:
            return {
                ...state,
                isNewRowMode: false,
            };
        case AppActionType.ADD_NEW_CALCULATION_ITEM:
            return {
                ...state,
                calculation: DataMutationService.addNewItemInCalculation(state.calculation, action.value),
                isNewRowMode: false,
            };
        case AppActionType.SAVE_CALCULATION:
            return {
                ...state,
                calculation: DataMutationService.cloneCalculation(action.value),
                isNewRowMode: false,
                originalCalculation: DataMutationService.cloneCalculation(action.value),
            };
        case AppActionType.CANCEL_CALCULATION_CHANGES:
            return {
                ...state,
                calculation: DataMutationService.cloneCalculation(state.originalCalculation),
                isNewRowMode: false,
            };
        case AppActionType.REMOVE_CALCULATION_ITEM:
            return {
                ...state,
                calculation: DataMutationService.removeItemFromCalculation(state.calculation, action.value),
                isNewRowMode: false,
            };
        default:
            return state;
    }
};

const authReducer: Reducer = (state: IAppReduxState, action: IAppAction) => {
    return state ? state : {};
};

export const rootReducer: Reducer<ICombinedReducersEntries> = combineReducers({
    appReducer,
    authReducer,
});
