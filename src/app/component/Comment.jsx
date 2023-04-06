import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";
import Toolbar from './Toolbar.jsx'
import {addAddAnimation, addAddNoteAnimation, selectCollection} from "../../redux/slice/collectionSlice";
import {useDispatch, useSelector} from "react-redux";
import TextareaOfTextarea from "./TextareaOfTextarea.jsx";

const {secondary, tertiary, fontColor, quaternary, transition_speed1, transition_speed2} = global

const Comment = styled.div`
    width: 100%;
    transform: translateY(${({animation}) => animation ? '-100px' : '0'});
    ${transition_speed1}
    overflow: hidden;
    border-left: 3px solid ${secondary};
    padding: 0 0 0 6px;
    margin: 8px 0 0 0;
    color: ${fontColor};
`
const Note = styled.div`
    width: 100%;
`


const App = (p) => {
    const dispatch = useDispatch()
    const {comment} = p
    const {addNewCommentAnimation} = useSelector(selectCollection)

    useMemo(() => {
        setTimeout(() => {
            dispatch(dispatch(addAddAnimation('comment')))
        }, 0)
    }, [addNewCommentAnimation])


    return (comment.map(comment =>
        <Comment
            key={comment.key}
            animation={addNewCommentAnimation === comment.key}>
            <Note>
                <Toolbar
                    item={comment}
                    area={'collection'}
                    type={'comment'}/>
                <TextareaOfTextarea item={comment}/>
            </Note>
        </Comment>
    ))


};

export default App
