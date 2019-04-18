import { IAppProps } from "./appProps";
import { IAuthProps } from "./authProps";

export interface ICombinedReducersEntries {
    authReducer: IAuthProps;
    appReducer: IAppProps;
}
