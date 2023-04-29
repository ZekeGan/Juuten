import React from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectGlobal } from "../../redux/slice/globalSlice";

const Page = styled.div`
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%) translateY(${({ warning }) => warning ? '20px' : '-20px'});
    width: ${({ config }) => config.max_width}px;
    height: 20px;  
    width: 85%;
    text-align: center; 
    background-color: ${({ config }) => config.warning};
    color: white;
    z-index: 3;
    border-radius: 10px;
    transition: 0.2s ease-out;
    font-size: ${({ config }) => config.font_size_m}px;`

const Warning = React.memo((
    {
        warning,
        children
    }) => {
    const { configuration: config } = useSelector(selectGlobal)
    return (
        <Page
            config={config}
            warning={warning}
        >
            {children}
        </Page>
    );
})

export default Warning;