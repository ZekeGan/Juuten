import React from "react";
import ReactDOM from 'react-dom/client'
import Router from './page/Router.jsx'
import { Provider } from "react-redux";
import store from 'Store/store'
import './assets/style.css'

const root = ReactDOM.createRoot(document.getElementById('Juuten_root'))
root.render(
    <Provider store={store}>
        <Router />
    </Provider>
)