import React, {useEffect, useRef, useState} from 'react';
import BottemBarTemplate from "../BottemBarTemplate.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Editor, EditorState, RichUtils, convertToRaw,} from 'draft-js'
import {convertToHTML} from 'draft-convert'
import {addAddNewNote, addOpenAddNewNote, selectCollection} from "../../../redux/slice/collectionSlice";
import styled from "styled-components";
import Icon from '../../../assets/svg.jsx'
import {global} from "../../../assets/global";
import DraftComponent from "../../../component/DraftComponent.jsx";

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
    const {openAddNewNote, toggleCSS} = useSelector(selectCollection)
    const dispatch = useDispatch()
    const draftRef = useRef(null)

    function addNewNote() {
        if (!draftRef.current.hasText()) return
        dispatch(addAddNewNote(draftRef.current.getJSONData()))
        dispatch(addOpenAddNewNote())
    }

    useEffect(() => {
        if (openAddNewNote) draftRef.current?.autoFocus()
    }, [openAddNewNote])

    return (
        <BottemBarTemplate
            open={openAddNewNote}
            closeCallback={() => dispatch(addOpenAddNewNote())}
        >
            <Main>
                <Textarea>
                    <DraftComponent ref={draftRef}/>
                </Textarea>
                <EditToolbar>
                    <div className={'toggle_box'}>
                        <div
                            className={'btn toggle_btn'}
                            style={toggleCSS.includes('BOLD') ? {fontWeight: 'bold'} : {}}
                            onMouseDown={(e) => draftRef.current.toggleStyle('BOLD', e)}
                        >
                            B
                        </div>
                        <div
                            className={'btn toggle_btn'}
                            style={toggleCSS.includes('ITALIC') ? {fontStyle: 'italic'} : {}}
                            onMouseDown={(e) => draftRef.current.toggleStyle('ITALIC', e)}
                        >
                            I
                        </div>
                        <div
                            className={'btn toggle_btn'}
                            style={toggleCSS.includes('STRIKETHROUGH') ? {textDecoration: 'line-through'} : {}}
                            onMouseDown={(e) => draftRef.current.toggleStyle('STRIKETHROUGH', e)}
                        >
                            S
                        </div>
                        <div
                            className={'btn toggle_btn'}
                            style={toggleCSS.includes('UNDERLINE') ? {textDecoration: 'underline'} : {}}
                            onMouseDown={(e) => draftRef.current.toggleStyle('UNDERLINE', e)}
                        >
                            U
                        </div>
                    </div>
                    <div
                        className={'btn addNote_btn'}
                        onClick={() => addNewNote()}
                    >
                        新增
                    </div>
                </EditToolbar>
            </Main>
        </BottemBarTemplate>
    );
}

export default AddNewNote;