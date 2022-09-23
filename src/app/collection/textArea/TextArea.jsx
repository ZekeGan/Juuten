import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {addAddAnimation, addSetFocusFlag, } from "../../../redux/slice/collectionSlice";
import {global} from "../../../assets/global";

import Toolbar from "./Toolbar.jsx";
import Comment from "./Comment.jsx";

const {transition_speed1,transition_speed2, tertiary, secondary, warning} = global


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
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${secondary};
        border-radius: 2.5px;
    }`

const Note = styled.div`
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
    font-size: 0.5rem;`

/* 輸入內容的地方 */
const Url = styled.div`
    display: flex;
    align-items: center;
    font-size: 9px;
    > img {
        height: 12px;
        margin-right: 6px;
    }   
    > .url > a {
        font-size: 9px;
        transform: scale(0.9);
        color: ${tertiary};
        text-decoration: none;
    }`

const StyledTextarea = styled.textarea`
    display: block;
    width: 100%;
    height: auto;
    border: none;
    padding: 5px 0 10px 0;
    overflow: hidden;
    resize: none;
    background-color: transparent;
    outline: none;`

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

    const {saveWarning, id, obj} = p

    const data = obj[id]
    const {addNewNoteAnimation, storageAddAnimation, openEditId, openEditType, focusFlag} = obj


    /* textarea 根據內容展開 */
    useEffect(() => {
        document.querySelectorAll('textarea').forEach(item => {
            item.style.height = item.scrollHeight + 'px'
        })
    }, []);


    /* 新增筆記後的動畫 */
    useMemo(() => {
        setTimeout(() => {
            dispatch(addAddAnimation('note'))
        }, 0)
    }, [addNewNoteAnimation])


    /* event */
    const textChange = (e) => {
        e.target.style.height = 'auto'
        e.target.style.height = `${e.target.scrollHeight}px`
        console.log(e.target.initial)
    }


    const autoFocus = (textarea) => {
        if (!textarea) return
        const end = textarea.value.length
        textarea.setSelectionRange(end, end)
        dispatch(addSetFocusFlag(false))
        textarea.focus()
    }

    return (
        <TextArea>
            <Warning isSave={saveWarning}>請先儲存後再離開</Warning>

            {data.map(item => (
                <Note key={item.key}
                      noteType={item.type === 'note'}
                      open={openEditId === item.key}
                      add={item === addNewNoteAnimation}>

                    {/* upper toolbar */}
                    <Toolbar item={item}
                             noteType={item.type === 'collection'}
                             editCount={editCount}
                             openEditType={openEditType}
                             setEditCount={setEditCount}
                             openEditId={openEditId}/>


                    {/* textarea */}
                    <StyledTextarea defaultValue={item.msg}
                                    id={`Juuten_noteTextarea_${item.key}`}
                                    onInput={(e) => textChange(e)}
                                    ref={textarea => openEditId === item.key && focusFlag && autoFocus(textarea)}
                                    disabled={!(openEditId === item.key)}/>

                    <Url>
                        {item.favIconUrl ? <img src={item.favIconUrl} alt=""/> : ''}
                        <div className="url"><a href={item.url}>{item.url}</a></div>
                    </Url>


                    {item.comment ?
                        <Comment comment={item.comment}
                                 obj={obj}
                                 textChange={textChange}
                                 autoFocus={autoFocus}/> : ''
                    }
                </Note>

            ))}


            <Bottom>已經到最底了</Bottom>
        </TextArea>
    );
}

export {TextArea, Note, Warning, StyledTextarea, Url}