import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectGlobal} from "../../redux/slice/globalSlice";


const Page = styled.div`
    text-align: center;
    color: ${({font}) => font ? 'black' : 'white'};
    // caret-color: ${({font,config}) => font ? config.primary : config.tertiary};
    outline: none;
    border: none;
    margin: 10px 0;
    overflow: hidden;
    font-size: ${({config}) => config.font_size_m}px;
`
function FolderName(props) {
    const {font} = props
    const {configuration: config} = useSelector(selectGlobal)
    return (
        <Page config={config} font={font}>
            {props.children}
        </Page>
    );
}

export default FolderName;