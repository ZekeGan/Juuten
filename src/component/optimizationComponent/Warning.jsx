import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectGlobal} from "../../redux/slice/globalSlice";

const Page = styled.div`
    position: absolute;
    transform: translateY(${({warning}) => warning ? '18px' : '-20px'});
    width: ${({config}) => config.max_width}px;
    height: 20px;  
    text-align: center; 
    background-color: ${({config}) => config.warning};
    color: white;
    z-index: 7;
    border-radius: 10px;
    transition: 0.2s ease-out;
    font-size: ${({config}) => config.font_size_m}px;`

const Warning = React.memo((props) => {
    const {configuration: config} = useSelector(selectGlobal)
    return (
        <Page
            config={config}
            warning={props.warning}
        >
            {props.children}
        </Page>
    );
})

export default Warning;