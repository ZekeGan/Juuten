import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {
    selectCollection
} from "../../redux/slice/collectionSlice";
import {useDispatch, useSelector} from "react-redux";
import {autoFocus} from "../../assets/global";
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js'
import {convertToHTML} from "draft-convert";
import Toolbar from "../component/Toolbar.jsx";

const NewStyledTextarea = styled.textarea`
    display: block;
    width: 100%;
    height: auto;
    border: none;
    padding: 5px 0 10px 0;
    overflow: hidden;
    resize: none;
    background-color: transparent;
    outline: none;`





function TextareaOfTextarea(props) {
    const dispatch = useDispatch()
    const {item} = props
    const {openEditId, focusFlag, useTool} = useSelector(selectCollection)
    const [editorState, setEditorState] = useState(() => {

        return EditorState.createWithContent(convertFromRaw(JSON.parse(item.msg)))
    })

    function onChange(state) {
        setEditorState(state)
    }

    function save() {
        return JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    }


    // useEffect(() => {
    //     if (openEditId === item.key) {
    //         let textarea = document.querySelector(`#Juuten_noteTextarea_${openEditId}`)
    //         textarea.style.height = `${textarea.scrollHeight}px`
    //     }
    // })




    return (
        <>
            <Toolbar item={item}
                     saveEdit={() => save()}
            />
            {
                openEditId === item.key
                && <Editor
                    editorState={editorState}
                    onChange={onChange}
                />
            }

            {
                !(openEditId === item.key)
                && <p dangerouslySetInnerHTML={{__html: convertToHTML(editorState.getCurrentContent())}}
                    style={{whiteSpace: 'pre-line'}}/>
            }
        </>

    );
}

export default TextareaOfTextarea;