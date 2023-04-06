import React from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";
import {useSelector} from "react-redux";
import {selectCollection} from "../../redux/slice/collectionSlice";

const {transition_speed1} = global
const Page = styled.div`
    position: relative;
    background-color: ${({noteType}) => noteType ? '#fffab9' : 'white'};
    border-radius: 10px;
    box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.2); 
    width: 100%;
    ${({add}) => add ? 'height: 0;' : ''}
    ${({add}) => add ? '' : 'margin: 5px 0;'}
    ${({add}) => add ? 'transform: translateY(-150px);' : ''}
    ${transition_speed1}
    ${({add}) => add ? '' : 'padding: 5px 15px 10px;'}
    > * {
        
    }
    ${p => p.open ? '' : '&:hover { box-shadow: 4px 4px 3px  rgba(0,0,0,0.2); }'}`

function Note(props) {
    const {openEditId, addNewNoteAnimation} = useSelector(selectCollection)
    const {item} = props
    return (
        <Page
            noteType={item?.noteType === 'note'}
            open={item?.key === openEditId}
            add={item === addNewNoteAnimation}>
            {props?.Toolbar}
            {props?.TextareaOfTextarea}
            {props?.Url}
            {props?.Comment}
        </Page>
    );
}

export default Note;