import React from "react";
import ReactDOM from 'react-dom/client'
import Router from './page/Router.jsx'
import {Provider} from "react-redux";
import store from './redux/store'
// import GlobalStyle from "./assets/global.js";
import './assets/style.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        {/*<GlobalStyle/>*/}
        <Router/>
    </Provider>
)