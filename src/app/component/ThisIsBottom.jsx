import React from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";
const {tertiary, secondary} = global
const Bottom = styled.div`
    width: 80%;
    padding: 2%;
    text-align: center;
    color: ${tertiary};
    border-bottom: 1px solid ${secondary}; 
`
function ThisIsBottom(props) {
    return (
        <Bottom>已經到最底</Bottom>
    );
}

export default ThisIsBottom;