import React from 'react';
import {HashRouter as Router, Routes, Route} from "react-router-dom";

import Home from './Folder.jsx'
import Collection from './collection/Collection.jsx'




export default function App(props) {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='home' element={<Home/>}/>
                <Route path='collection/:id' element={<Collection />} />
                <Route path='*' element={<Home />} />
            </Routes>
        </Router>
    );
}

