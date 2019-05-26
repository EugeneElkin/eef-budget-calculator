import { combineReducers, Reducer } from "redux";

import { ICalculation } from "../interfaces/i-calculation";
import { DataMutationService } from "../services/data-mutation-service";
import { AppActionType, IAppAction, LoginActionType } from "./actions";
import { ICalculationItem } from "../interfaces/i-calculation-item";

interface IAppReduxState {
    isLoginActive?: boolean | null;
    isNewRowMode: boolean;
    calculation: ICalculation;
    originalCalculation: ICalculation;
    selectedCalculationItem?: ICalculationItem
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
    selectedCalculationItem: undefined,
};

const appReducer: Reducer = (state: IAppReduxState = initialAppReducerState, action: IAppAction): IAppReduxState => {
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
                selectedCalculationItem: undefined,
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
                selectedCalculationItem: undefined,
            };
        case AppActionType.REMOVE_CALCULATION_ITEM:
            return {
                ...state,
                calculation: DataMutationService.removeItemFromCalculation(state.calculation, action.value),
                isNewRowMode: false,
                selectedCalculationItem: undefined,
            };
        case AppActionType.SWITCH_CALCULATION_ITEM_PAYMENT_STATUS:
            return {
                ...state,
                calculation: DataMutationService.switchCalculationItemPaymentStatus(state.calculation, action.value),
            }
        case AppActionType.SELECT_CALCULATION_ITEM:
            return {
                ...state,
                selectedCalculationItem: action.value,
            }
        case AppActionType.CHANGE_CALCULATION_ITEM_PROPERTY:
            return {
                ...state,
                calculation: DataMutationService.changeCalculationItemProperty(state.calculation, action.value)
            }
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
