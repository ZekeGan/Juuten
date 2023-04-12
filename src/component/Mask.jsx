import React from 'react';
import styled from "styled-components";
import {global} from "../assets/global";

const {main, primary, transition_speed1, max_height, max_width, primary_opacity} = global


const Mask = styled.div`
    ${transition_speed1}
    position: absolute;
    z-index: ${({open}) => open ? '3' : '0'};
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,${({open}) => open ? '0.5' : '0'});`

function App({open = false, onClick = () => {}}) {
    return (
        <Mask open={open} onClick={onClick}/>
    );
}

export default App;