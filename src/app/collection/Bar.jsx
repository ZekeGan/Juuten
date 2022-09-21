import React from 'react';
import {Main, Navbar} from "./Storage.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addOpenBar, selectCollection} from "../../redux/slice/collectionSlice.js";
import Icon from "../../assets/svg.jsx";

function Bar(props) {
    const dispatch = useDispatch()
    const {openBar} = useSelector(selectCollection)
    const {navbar} = props
    const close = () => dispatch(addOpenBar())
    return (
        <Main open={openBar}>
            <Navbar>
                <Icon.Right styled={navbar} onClick={() => close()}/>
            </Navbar>
        </Main>

    );
}

export default Bar;