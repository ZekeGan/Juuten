import React from 'react';
import styled from "styled-components";

import {global} from "../assets/global";
const {transition_speed1, warning, font_size_m, max_width} = global

const Page = styled.div`
    position: fixed;
    transform: translateY(${({warning}) => warning ? '5px' : '-50px'});
    width: ${max_width - (max_width / 10)}px;
    height: 20px;  
    text-align: center; 
    background-color: ${warning};
    color: white;
    z-index: 8;
    border-radius: 10px;
    ${transition_speed1}
    font-size: ${font_size_m}px;`

function Warning(props) {

    return (
        <Page warning={props.warning}>
            {props.children}
        </Page>
    );
}

export default Warning;