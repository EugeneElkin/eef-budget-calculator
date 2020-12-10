import ReactDOM from "react-dom";
import { createStore } from "redux";

import { PageComponent } from "./components/page";
import { rootReducer } from "./state/reducers";

import "./index.css";

export const store = createStore(rootReducer);

ReactDOM.render(
    <PageComponent />,
    document.getElementById("root"),
);
