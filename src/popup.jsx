import React from "react";
import ReactDOM from 'react-dom/client'
import Router from './jsx/Router.jsx'
import {createGlobalStyle} from "styled-components";
import {Provider} from "react-redux";
import store from './jsx/redux/store'

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        font-size: 16px;
        box-sizing: border-box;
    }
`

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <GlobalStyle/>
        <Router/>
    </Provider>
)