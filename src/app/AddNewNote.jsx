import React, {useEffect, useRef, useState} from 'react';
import BottemBarTemplate from "./component/BottemBarTemplate.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Editor, EditorState, RichUtils, convertToRaw, } from 'draft-js'
import {convertToHTML} from 'draft-convert'
import {addOpenAddNewNote, selectCollection} from "../redux/slice/collectionSlice";
import styled from "styled-components";
import Icon from '../assets/svg.jsx'
import {global} from "../assets/global";

const {icon_size_l, secondary} = global
const Main = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 3%;`


const Textarea = styled.div`
    display: block;
    height: 70%;
    background-color: white;
    
    padding: 2%;
    overflow: scroll;
    overflow-X: hidden;
    border-radius: 10px;
    > .editor {
        color: red;
        > h1 {
            font-size: 5em;
        }
    }
    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${secondary};
        border-radius: 2.5px;
    }`

const EditToolbar = styled.div`
    display: flex;
    justify-content: right;
    height: 10%;
    margin-top: 3%;
    border-radius: 10px;
    > .toggle_box {
        width: 100%;
        display: flex;
    }
    .btn {
        cursor: pointer;
        user-select: none;
         height: 30px;
        border-radius: 15px;
        text-align: center;
        line-height: 30px;
        &:active {
            transform: scale(0.95);
        }
    }
    .toggle_btn {
        font-family: SourceHanSansHWTC-Regular;
        width: 30px;
        margin-right: 30px;
    }
    .addNote_btn {
        width: 100px;
        background-color: white;
    }
    
`

function AddNewNote(props) {
    const {openAddNewNote} = useSelector(selectCollection)
    const dispatch = useDispatch()
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

    function onChange(state) {
        setEditorState(state)
    }


    function handleStyleToggle(style, e) {
        e.preventDefault()
        const selection = editorState.getSelection()
        if (selection.isCollapsed()) {
            onChange(RichUtils.toggleInlineStyle(editorState, style))
        } else {
            const newSelection = selection.merge({
                focusOffset: selection.getEndOffset(),
                anchorOffset: selection.getStartOffset()
            })
            const newEditorState = RichUtils.toggleInlineStyle(editorState, style)
            onChange(EditorState.forceSelection(newEditorState, newSelection))
        }

    }

    function handleToggleHeader(header) {
        // console.log(convertToRaw(editorState.getCurrentContent()))

    }

    function handleAllBold() {
        const currentStyle = editorState.getCurrentInlineStyle();
        const styleArr = currentStyle.toArray();
        console.log(currentStyle)
    }

    function saveToCollection() {
        const text = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        console.log(text)
    }

    function autoFocus(state) {
        if (openAddNewNote) {
            onChange(EditorState.moveFocusToEnd(state))
        }
    }

    useEffect(() => {
        autoFocus(editorState)
    }, [openAddNewNote])


    return (
        <BottemBarTemplate
            open={openAddNewNote}
            closeCallback={() => dispatch(addOpenAddNewNote())}>
            <Main>
                <Textarea>
                    <Editor
                        editorState={editorState}
                        onChange={onChange}

                    />
                </Textarea>
                <EditToolbar>

                    <div className={'toggle_box'}>
                        <div
                            className={'btn toggle_btn'}
                            style={
                                editorState.getCurrentInlineStyle().toJS().includes('BOLD')
                                    ? {fontWeight: 'bold'}
                                    : {}
                            }
                            onMouseDown={(e) => handleStyleToggle('BOLD', e)}
                        >
                            B
                        </div>
                        <div
                            className={'btn toggle_btn'}
                            style={
                                editorState.getCurrentInlineStyle().toJS().includes('ITALIC')
                                    ? {fontStyle: 'italic'}
                                    : {}
                            }
                            onMouseDown={(e) => handleStyleToggle('ITALIC', e)}
                        >
                            I
                        </div>
                        <div
                            className={'btn toggle_btn'}
                            style={
                                editorState.getCurrentInlineStyle().toJS().includes('STRIKETHROUGH')
                                    ? {textDecoration: 'line-through'}
                                    : {}
                            }
                            onMouseDown={(e) => handleStyleToggle('STRIKETHROUGH', e)}
                        >
                            S
                        </div>
                        <div
                            className={'btn toggle_btn'}
                            style={
                                editorState.getCurrentInlineStyle().toJS().includes('UNDERLINE')
                                    ? {textDecoration: 'underline'}
                                    : {}
                            }
                            onMouseDown={(e) => handleStyleToggle('UNDERLINE', e)}
                        >
                            U
                        </div>
                    </div>


                    {/*<div className={'addNote_btn'} onClick={() => handleAllBold()}>AllBold</div>*/}
                    {/*<div className={'addNote_btn'} onClick={() => handleToggleHeader('unordered-list-item')}>content</div>*/}

                    <div className={'btn addNote_btn'} onMouseDown={saveToCollection}>新增</div>
                </EditToolbar>
            </Main>


        </BottemBarTemplate>
    );
}

export default AddNewNote;