import React from 'react';
import styled from "styled-components";

import {global} from "../../assets/global";
const {transition_speed1, warning} = global

const Page = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(${({warning}) => warning ? '0' : '-200px'});
    width: 350px;
    height: 20px;  
    text-align: center; 
    background-color: ${warning};
    color: white;
    z-index: 8;
    border-radius: 10px;
    ${transition_speed1}
    font-size: 0.8rem;`

function Warning(props) {

    return (
        <Page warning={props.warning}>
            {props.children}
        </Page>
    );
}

export default Warning;