import React, {useEffect, useMemo} from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {addAddAnimation,} from "../../../redux/slice/collectionSlice";
import {global, autoFocus} from "../../../assets/global";

import Toolbar from "../../component/Toolbar.jsx";
import Comment from "../../component/Comment.jsx";
import TextareaOfTextarea from "../../component/TextareaOfTextarea.jsx";
import Url from "../../component/Url.jsx";
import Note from '../../component/Note.jsx'
import ThisIsBottom from "../../component/ThisIsBottom.jsx";
import Warning from "../../component/Warning.jsx";

const {tertiary, secondary} = global


/* main */
const TextMain = styled.div`
    width: 100%;
    height: calc(100% - 48px);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 10px 10px 10px;
    overflow: scroll;
    overflow-X: hidden;
    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${secondary};
        border-radius: 2.5px;
    }`


/* 底部 */



export default function App(p) {
    const dispatch = useDispatch()
    const {saveWarning, id, obj} = p
    const data = obj[id]
    const {addNewNoteAnimation, openEditId} = obj

    /* textarea 根據內容展開 */
    // useEffect(() => {
    //     document.querySelectorAll('textarea').forEach(item => {
    //         item.style.height = item.scrollHeight + 'px'
    //     })
    // }, [data]);


    /* 新增筆記後的動畫 */
    useMemo(() => {
        setTimeout(() => {
            dispatch(addAddAnimation('note'))
        }, 0)
    }, [addNewNoteAnimation])

    return (
        <TextMain>
            <Warning
                warning={saveWarning}>
                請退出編輯後再離開
            </Warning>
            {
                data.map(item => (
                    <Note
                        key={item.key}
                        item={item}
                        // Toolbar={
                        //     <Toolbar
                        //         item={item}
                        //         area={'collection'}
                        //         noteType={item.type === 'collection'}/>
                        // }
                        TextareaOfTextarea={
                            <TextareaOfTextarea
                                item={item}/>
                        }
                        Url={
                            <Url
                                item={item}/>
                        }
                        Comment={
                            item.comment
                            && <Comment
                                comment={item.comment}
                                obj={obj}/>
                        }
                    />
                ))
            }
            <ThisIsBottom/>
        </TextMain>
    );
}

export {TextMain}