import React from 'react';
import {
    HashRouter as Router,
    Routes,
    Route, useNavigate
} from "react-router-dom";
import Home from './folder/Main.jsx'
import Collection from './collection/Main.jsx'


export default function App() {

    console.log('router');
    console.log('test');

    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={<Home />} />
                <Route
                    path='home'
                    element={<Home />} />
                <Route
                    path='collection/:id'
                    element={<Collection />} />
                <Route
                    path='*'
                    element={<Home />} />
            </Routes>
        </Router>
    );
}

