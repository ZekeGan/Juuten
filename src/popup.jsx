import React from "react";
import ReactDOM from 'react-dom/client'
import Router from './jsx/Router.jsx'
import {Provider} from "react-redux";
import store from './jsx/redux/store'
import GlobalStyle from "./jsx/global/global.js";


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <GlobalStyle/>
        <Router/>
    </Provider>
)