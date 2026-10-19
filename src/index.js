
import React, { } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Store from "./ResaSportif/Store";
import Root from "./ResaSportif/Root";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={Store}>
        <Root />
    </Provider>
);