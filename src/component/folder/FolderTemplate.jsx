import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectGlobal} from "../../redux/slice/globalSlice";

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
    > div > svg {
        opacity: ${({open}) => open ? 0 : 1};
    }`

const FolderTemplate = (props) => {
    const {
        style = {},
        onClick = () => {},
        dClick = () => {},
        folderColor = 'white',
    } = props
    const {configuration: config} = useSelector(selectGlobal)

    return (
        <Main
            config={config}
            style={style}
            onClick={onClick}
            onDoubleClick={dClick}
            folderColor={folderColor}
        >
            {props.children}
        </Main>
    );
}

export default FolderTemplate;