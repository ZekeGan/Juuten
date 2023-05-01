import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './folder/Main.jsx'
import Collection from './collection/Main.jsx'

export default function App() {
<<<<<<< HEAD

    console.log('router');
<<<<<<< HEAD
    console.log('test');
=======
>>>>>>> b6dc3fac43a93fd134125dd541fd013b97eb8160

=======
>>>>>>> 2a3a319 (501 OPT)
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

