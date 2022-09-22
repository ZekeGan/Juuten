import React, {useLayoutEffect} from 'react';
import styled from "styled-components";
import {global} from "../../../assets/global";
import Icon from '../../../assets/svg.jsx'
import {addEditComment, addEditNote, addOpenEditToolbar, addOpenEditType} from "../../../redux/slice/collectionSlice";
import {useDispatch} from "react-redux";

const {tertiary,secondary} = global

const Toolbar = styled.div`
    position: relative;
    width: 100%;
    height: 20px;
    overflow: hidden;
    padding-top: 6px;`

const UrlBox = styled.div`
    transition: 0.2s ease-out ${p => p.open ? '' : '200ms'};
    transform: translateY(${p => p.open ? '-27px' : '-5px'});
    color: ${tertiary};
    > span {
        display: block;
        font-size: 9px;
        transform: translateY(-30%);
        color: ${tertiary};
        padding-top: 6px;
    }
    > .Juuten_toolbox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > div {
            display: flex;
            font-size: 9px;
        }
       
    }`

const EditToolbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.2s ease-out ${p => p.open ? '200ms' : ''};
    transform: translateY(${p => p.open ? '3px' : '-20px'}); 
    color: ${tertiary};
    > div {
        font-size: 9px;
        transform: scale(0.9);
        display: flex;
        justify-content: space-between;
        > div {
            margin-left: 1%;
        }
    }`

const BuildDate = styled.div`
    width: 93%;
    ${({comment}) => comment ? `border-top: 1px solid ${secondary};` : ''}
    > div {
        margin-right: auto;
        font-size: 9px;
        margin-top: 1px;
        color: ${tertiary};
        transform: scale(0.8) translateX(-13px);
    }
`


export default function App(p) {
    const dispatch = useDispatch()
    let {item, noteType, editCount, setEditCount, openEditId, openEditType} = p

    /* editing動畫 */
    const ShowEditCount = () => {
        switch (editCount) {
            case 0:
                return <div>Editing</div>
            case 1:
                return <div>Editing .</div>
            case 2:
                return <div>Editing . .</div>
            case 3:
                return <div>Editing . . .</div>
        }
    }


    /* editing 動畫數數 */
    useLayoutEffect(() => {
        if (!openEditId) return
        if (editCount > 3) setEditCount(0)
        let timer = setInterval(() => setEditCount(editCount++), 1000)
        return () => clearInterval(timer)
    }, [openEditId, editCount])


    const open = (payload) => {
        dispatch(addOpenEditToolbar(payload))
        setEditCount(0)
    }

    const save = (payload) => {
        const textarea = document.querySelector(`#Juuten_noteTextarea_${openEditId}`)
        const newMsg = textarea.value
        textarea.style.height = textarea.style.scrollHeight
        console.log(textarea.scrollHeight)
        dispatch(addEditComment({
            type: payload.type,
            msg: newMsg
        }))
        dispatch(addOpenEditToolbar(payload.key))
    }

    const addComment = (payload) => {
        dispatch(addEditComment(payload))
    }

    const deleteNoteOrComment = (payload) => {
        if (openEditType === 'collection' || openEditType === 'note') dispatch(addEditNote(payload))
        dispatch(addEditComment(payload))
    }

    return (
        <Toolbar>

            {/* date and url place */}
            <UrlBox open={openEditId === item.key}>

                    <div className='Juuten_toolbox'>
                        <BuildDate comment={item.type === 'comment'}>
                            <div>{item.currentDate}</div>
                        </BuildDate>
                        <Icon.Ellipsis_Rotate90 onClick={() => open({
                            key: item.key,
                            type: item.type
                        })}/>
                    </div>

                    {/*<div className='Juuten_toolbox'>*/}
                    {/*    <div>Note</div>*/}
                    {/*    <Icon.Ellipsis_Rotate90 onClick={() => open({*/}
                    {/*        key: item.key,*/}
                    {/*        type: item.type*/}
                    {/*    })}/>*/}
                    {/*</div>*/}


            </UrlBox>


            {/* editing 動畫 */}
            <EditToolbar open={openEditId === item.key}>
                <ShowEditCount className='count'/>
                <div>
                    <Icon.Save onClick={() => save({
                        key: '',
                        type: 'modify'
                    })}/>
                    <Icon.Chat onClick={() => addComment({type: 'add'})}/>
                    <Icon.Delete onClick={() => deleteNoteOrComment({type: 'delete'})}/>
                </div>
            </EditToolbar>

        </Toolbar>
    );
};

