import { AppProps } from "./appProps";
import { AuthProps } from "./authProps";

export interface ICombinedReducersEntries {
    authReducer: AuthProps;
    appReducer: AppProps;
}
