import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {global} from "../../../assets/global";
import {StyledTextarea, BuildDate} from "./TextArea.jsx";
import Toolbar from './Toolbar.jsx'

const {secondary, tertiary, fontColor} = global

const Comment = styled.div`
    width: 100%;
    bnackground-color: ${secondary}; 
    border-left: 3px solid ${secondary};
    padding: 0 0 0 6px;
    margin-top: 8px;
    color: ${fontColor};
`
const Note = styled.div`
    width: 100%;
`

const App = (p) => {
    const {obj, comment} = p

    return comment.map(note => (
        <CommentTemplate key={note.key} obj={obj} comment={note}/>
    ))

};


const CommentTemplate = (p) => {
    const [editText, setEditText] = useState('')
    const [editCount, setEditCount] = useState(0)
    const {comment, obj} = p
    const {addNewNoteAnimation, openEditId} = obj

    const textChange = (ta) => {
        ta.style.height = `${ta.scrollHeight}px`
        setEditText(ta.value)
    }

    return (
        <Comment comment={comment} obj={obj}>
                <Note key={comment.key}>
                    <Toolbar item={comment}
                             noteType={comment.type === 'comment'}
                             editCount={editCount}
                             setEditCount={setEditCount}
                             openEditId={openEditId}/>

                    <StyledTextarea defaultValue={comment.msg}
                                    id={`Juuten_noteTextarea_${comment.key}`}
                                    onInput={(e) => textChange(e.target)}
                                    disabled={!(openEditId === (comment.key))}/>


                    {comment.comment ?
                        <App comment={comment.comment} obj={obj}/> : ''
                    }
                </Note>
        </Comment>
    );
};

export default App
