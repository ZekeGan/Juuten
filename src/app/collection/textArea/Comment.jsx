import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from "styled-components";
import {global} from "../../../assets/global";
import {StyledTextarea, BuildDate} from "./TextArea.jsx";
import Toolbar from './Toolbar.jsx'
import {addAddAnimation, addAddNoteAnimation} from "../../../redux/slice/collectionSlice";
import {useDispatch} from "react-redux";

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
    const {obj, comment, autoFocus, textChange} = p
    return comment.map(note => (
        <CommentTemplate key={note.key}
                         obj={obj}
                         comment={note}
                         textChange={textChange}
                         autoFocus={autoFocus}/>
    ))
};


const CommentTemplate = (p) => {
    const [editCount, setEditCount] = useState(0)

    const dispatch = useDispatch()
    const {comment, obj, autoFocus, textChange} = p
    const {openEditId, addNewCommentAnimation, focusFlag} = obj

    useMemo(() => {
        setTimeout(() => {
            dispatch(dispatch(addAddAnimation('comment')))
        }, 0)
    }, [addNewCommentAnimation])



    return (
        <Comment comment={comment} obj={obj} animation={addNewCommentAnimation === comment.key}>
            <Note key={comment.key}>
                <Toolbar item={comment}
                         noteType={comment.type === 'comment'}
                         editCount={editCount}
                         setEditCount={setEditCount}
                         openEditId={openEditId}/>

                <StyledTextarea defaultValue={comment.msg}
                                id={`Juuten_noteTextarea_${comment.key}`}
                                ref={textarea => openEditId === comment.key && focusFlag && autoFocus(textarea)}
                                onInput={textChange}
                                disabled={!(openEditId === comment.key)}/>


                {comment.comment ?
                    <App comment={comment.comment}
                         obj={obj}
                         textChange={textChange}
                         focusFlag={focusFlag}
                         autoFocus={autoFocus}/> : ''
                }
            </Note>
        </Comment>
    );
};

export default App
