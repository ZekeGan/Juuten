import React, {forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import styled from "styled-components";
import {global} from "../../../assets/global";
import Toolbar from './TextingToolbar.jsx'
import {
    addAddAnimation,
    addAddNoteAnimation,
    addOpenEditToolbar,
    selectCollection
} from "../../../redux/slice/collectionSlice";
import {useDispatch, useSelector} from "react-redux";
import Textarea from "./Textarea.jsx";
import Icon from '../../../assets/svg.jsx'
import {Draggable} from "react-beautiful-dnd";

const {main, secondary, tertiary, fontColor, quaternary, transition_speed1, transition_speed2, font_size_m} = global

const Comment = styled.div`
    position: relative;
    width: 100%;
    transform: translateY(${({animation}) => animation ? '-100px' : '0'});
    ${transition_speed1}
    overflow: auto;
    padding: 10px 10px 10px 25px;
    background-color: rgba(255, 255, 255, 0.5);
  
`
const DragHandle = styled.div`
    height: calc(100% - 20px);
    width: 15px;
    background-color: ${main};
    position: absolute;
    left: 0;
    top: 50%;
    transform: translatey(-50%) ${({open}) => open ? '' : 'translatex(-12px)'};
    ${transition_speed1}`


const App = (p, ref) => {
    const dispatch = useDispatch()
    const {parentItem, item, dragHandle, open, provided} = p
    const {addNewCommentAnimation, openEditId} = useSelector(selectCollection)

    useMemo(() => {
        setTimeout(() => {
            dispatch(dispatch(addAddAnimation('comment')))
        }, 0)
    }, [addNewCommentAnimation])


    return (
        <Comment animation={addNewCommentAnimation === item.key}>
            <DragHandle
                open={open}
                {...provided.dragHandleProps}
            />
            <Textarea item={item}/>
        </Comment>

    )


}

export default App
