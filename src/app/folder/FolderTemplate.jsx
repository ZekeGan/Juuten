import React from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";

const {transition_speed1, secondary, max_width, primary} = global
const Main = styled.div`
    position: relative;
    width: ${max_width * 0.9}px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0;
    border-radius: 10px;   
    background-color: ${p => p.folderColor};
    ${transition_speed1}
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
    > div > svg {
        opacity: ${({open}) => open ? 0 : 1};
    }`

function FolderTemplate(props) {
    const {
        style = {},
        onClick = () => {},
        dClick = () => {},
        folderColor = 'white',
        key
    } = props


    return (
        <Main
            style={style}
            onClick={onClick}
            onDoubleClick={dClick}
            // open={editFolderId === item.key}
            folderColor={folderColor}
        >
            {props.children}
        </Main>
    );
}

export default FolderTemplate;