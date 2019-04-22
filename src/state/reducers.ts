import { AnyAction, combineReducers, Reducer, Action } from "redux";
import { AppActionType, IAppAction } from "./actions";
import { ICalculation } from "../interfaces/i-calculation";
import { ICalculationItem } from "../interfaces/i-calculation-item";

interface IAppReduxState {
    isLoginActive?: boolean | null;
    isNewRowMode: boolean;
    calculation: ICalculation,
    originalCalculation: ICalculation,
}

interface IAuthReduxState {
    isAuthenticated: boolean;
}

export interface ICombinedReducersEntries {
    authReducer: IAuthReduxState;
    appReducer: IAppReduxState;
}

const initialAppReducerState: IAppReduxState = {
    isLoginActive: true,
    isNewRowMode: false,
    calculation: { items: [] },
    originalCalculation: { items: [] },
};

const appReducer: Reducer = (state: IAppReduxState = initialAppReducerState, action: IAppAction) => {
    switch (action.type) {
        case AppActionType.ACTIVATE_SIGNUP_TAB:
            return {
                ...state,
                isLoginActive: false,
            };
        case AppActionType.ACTIVATE_LOGIN_TAB:
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
                isNewRowMode: false,
                calculation: addNewItemInCalculation(state.calculation, action.value),
            };
        case AppActionType.SAVE_CALCULATION:
            return {
                ...state,
                calculation: cloneCalculation(action.value),
                originalCalculation: cloneCalculation(action.value),
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

// TODO: Move them to a service
function cloneCalculation(calculation: ICalculation): ICalculation {
    const clonnedCalculation = { ...calculation };
    clonnedCalculation.items = cloneCalculationItems(calculation.items);
    return clonnedCalculation;
}

function cloneCalculationItems(items: ICalculationItem[]) {
    const clonnedItems: ICalculationItem[] = [];
    for (const item of items) {
        clonnedItems.push({ ...item });
    }
    return clonnedItems;
}

function addNewItemInCalculation(calculation: ICalculation, item: ICalculationItem) {
    const newCalculation = cloneCalculation(calculation);
    newCalculation.items.push(item);
    return newCalculation;
};
