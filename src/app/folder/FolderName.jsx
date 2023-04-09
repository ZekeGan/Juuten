import React from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";

const {primary, tertiary, font_size_m} = global
const Page = styled.div`
    text-align: center;
    color: ${({font}) => font ? 'black' : 'white'};
    caret-color: ${({font}) => font ? primary : tertiary};
    outline: none;
    border: none;
    margin: 10px 0;
    overflow: hidden;
    font-size: ${font_size_m}px;
`
function FolderName(props) {
    const {font} = props
    return (
        <Page font={font}>
            {props.children}
        </Page>
    );
}

export default FolderName;