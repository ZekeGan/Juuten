import React, {useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addAddNoteAnimation, selectCollection} from "../../redux/slice/collectionSlice";
import {global} from "../../assets/global";

import NoteToolbar from "./textArea/Toolbar.jsx";
import Sidebar from "./textArea/Sidebar.jsx";
import {addEditFolderAnimationId} from "../../redux/slice/folderSlice";

const {transition_speed1, transition_speed2, tertiary, secondary, warning} = global


/* main */
const TextArea = styled.div`
    width: 100%;
    height: calc(100% - 48px);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 10px 10px 10px;
    overflow: scroll;
    overflow-X: hidden;
    transform: translateY(48px);
    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${secondary};
        border-radius: 5px;
    }`
const Note = styled.div`
    position: relative;
    background-color: white;
    border-radius: 10px;
    box-shadow: ${p => p.open ? '5px 5px 0.5px 2px rgba(0,0,0,0.4)' : '2px 2px 0.5px rgba(0,0,0,0.2)'}; 
    width: 100%;
    ${({add}) => add ? 'height: 0;' : ''}
    ${({add}) => add ? '' : 'margin: 5px 0;'}
    ${({add}) => add ? '' : 'padding: 0 20px 10px;'}
    ${({add}) => add ? 'transform: translateY(-250px);' : ''}
    ${p => p.open ? '' : '&:hover { box-shadow: 4px 4px 3px  rgba(0,0,0,0.2); }'}
    ${transition_speed1}
    > * {
        ${({add}) => add ? 'height: 0;' : ''}
    }
`


/* 提醒 */
const Warning = styled.div`
    position: fixed;
    z-index: 1;
    width: 350px;
    height: 20px;
    background-color: ${warning};
    color: white;
    border-radius: 10px;
    ${transition_speed1}
    transform: translateY(${p => p.isSave ? '0' : '-60px'});
    text-align: center;
    font-size: 0.5rem;
`


/* 輸入內容的地方 */
const Msg = styled.div`
    margin-top: 8px;`
const StyledTextarea = styled.textarea`
    display: block;
    width: 97%;
    border: none;
    padding: 10px 0;
    overflow: hidden;
    resize: none;
    background-color: transparent;
    outline: none;
`


/* 底部 */
const Bottom = styled.div`
    width: 80%;
    padding: 2%;
    text-align: center;
    color: ${tertiary};
    border-bottom: 1px solid ${secondary}; 
`


export default function App(p) {
    const [editCount, setEditCount] = useState(0)
    const [editText, setEditText] = useState('')
    const dispatch = useDispatch()
    const {id} = useParams()
    const {saveWarning, obj, openEditId} = p
    const data = obj[id]
    const {addNewNoteAnimation} = obj


    /* event */
    const textChange = (ta) => {
        ta.style.height = `${ta.scrollHeight}px`
        setEditText(ta.value)
    }


    /* textarea 根據內容展開 */
    useEffect(() => {
        document.querySelectorAll('textarea').forEach(item => item.style.height = item.scrollHeight + 'px')
    }, [addNewNoteAnimation]);

    /* 新增筆記後的動畫 */
    useMemo(() => {
        setTimeout(() => {
            dispatch(addAddNoteAnimation())
        }, 0)
    }, [addNewNoteAnimation])


    return (
        <TextArea>
            <Warning isSave={saveWarning}>請先儲存後再離開</Warning>

            {data.map(item => (
                <Note key={item.key} open={openEditId === (item.key)} add={item === addNewNoteAnimation}>

                    {/* upper toolbar */}
                    <NoteToolbar item={item} editCount={editCount} setEditCount={setEditCount} openEditId={openEditId}/>


                    {/* side toolbar */}
                    <Sidebar item={item} openEditId={openEditId} setEditCount={setEditCount}/>


                    {/* textarea */}
                    <StyledTextarea defaultValue={item.msg} onInput={(e) => textChange(e.target)}
                                    disabled={!(openEditId === (item.key))}/>
                </Note>
            ))}


            <Bottom>已經到最底了</Bottom>
        </TextArea>
    );
}

export {TextArea, Note, Msg, Warning}