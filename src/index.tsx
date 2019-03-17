import "./index.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { rootReducer } from "./state/reducers";
import { createStore } from "redux";
import { PageComponent } from "./components/page";

export const store = createStore(rootReducer);

ReactDOM.render(
    <PageComponent />,
    document.getElementById("root")
);
