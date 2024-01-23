
import React, { } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Store from "./PROJET_CC3/Store";
import Root from "./PROJET_CC3/Root";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={Store}>
        <Root />
    </Provider>
);