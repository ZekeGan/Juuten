import React, {useRef} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectGlobal} from "../redux/slice/globalSlice";


const Main = styled.div`
    position: relative;
    width: ${({config}) => config.max_width * 0.9}px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0 10px 0;
    border-radius: 10px;   
    background-color: ${p => p.folderColor};
    transition: 0.2s ease-out;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
    ${({overflow}) => overflow ? 'overflow: hidden;' : ''}
    > div > svg {
        opacity: ${({open}) => open ? 0 : 1};
    }`


const Template = (
    {
        folderColor = 'white',
        dClick,
        onClick,
        overflow = false,
        children,
    }) => {

    const {configuration: config} = useSelector(selectGlobal)
    console.log('folderTemplate')
    return (
        <Main
            overflow={overflow}
            config={config}
            onClick={() => onClick}
            onDoubleClick={() => dClick}
            folderColor={folderColor}
        >
            {children}
        </Main>
    );
}

export default Template;