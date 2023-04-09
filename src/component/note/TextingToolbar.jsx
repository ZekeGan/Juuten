import React, {useEffect} from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";
import Icon from '../../assets/svg.jsx'
import {
    addAddComment,
    addDeleteNoteOrComment,
    addEditCollectionOrStorage,
    addMoveToStorageOrCollection,
    addOpenEditToolbar,
    addSetFocusFlag,
    selectCollection
} from "../../redux/slice/collectionSlice";
import {useDispatch, useSelector} from "react-redux";
import ShowEditCounting from './EditingCounting.jsx'
import {convertToRaw} from "draft-js";

const {tertiary, icon_size_m, icon_size_l, icon_size_s, font_size_m, font_size_s} = global

const TextingToolbar = styled.div`
    position: relative;
    width: 100%;
    height: 25px;
    overflow: hidden;`

const DateBox = styled.div`
    display: flex;
    align-items: center;
    transition: 0.2s ease-out ${p => p.open ? '' : '200ms'};
    transform: translateY(${p => p.open ? '-25px' : '0px'});
    color: ${tertiary};
    > div {
        font-size: ${font_size_s}px;
    }
    > .build-date {
        margin-right: auto;
    }
    > .icon-box {
        display: flex;
        align-items: center;
        > div {
            margin-left: 20px;
        }
    }`

const EditToolbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.2s ease-out ${p => p.open ? '200ms' : ''};
    transform: translateY(${p => p.open ? '0px' : '-25px'}); 
    color: ${tertiary};
    > .icon-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > div {
            margin-left: 20px;
        }
        .textingToolbar {
            display: flex;
            > .toggle-btn {
                width: 30px;    
                text-align: center;
                font-family: SourceHanSansHWTC-Regular;
                cursor: pointer;
                margin-right: 20px;
            }
        }
    }
    `


export default function App(p) {
    const dispatch = useDispatch()
    let {item, draftRef,} = p
    const {openEditId, openEditType, useTool, toggleCSS} = useSelector(selectCollection)

    const open = (payload) => {
        // dispatch(addSetFocusFlag(true))
        dispatch(addOpenEditToolbar(payload))
    }

    /* 新增註記(comment) */
    const addComment = (payload) => {
        // dispatch(addSetFocusFlag(true))
        dispatch(addAddComment(payload))
    }

    /* 刪除 Note */
    const deleteNoteOrComment = () => {
        dispatch(addDeleteNoteOrComment({area: item.type}))
    }

    /* 移至storage OR collection */
    const moveToStorageOrCollection = (payload) => {
        dispatch(addMoveToStorageOrCollection(payload))
    }

    /* 儲存編輯 */
    const leaveEdit = () => {
        if (useTool) return
        const newMsg = JSON.stringify(convertToRaw(draftRef.current.editorState.getCurrentContent()))
        dispatch(addEditCollectionOrStorage({msg: newMsg, area: item.type}))
        dispatch(addOpenEditToolbar(''))
    }

    return (
        <TextingToolbar>
            {/* date place */}
            <DateBox open={openEditId === item.key}>
                <div className={'build-date'}>{item.currentDate}</div>

                <div className={'icon-box'}>
                    {
                        item.type === 'collection'
                        && <Icon.Chat
                            size={icon_size_m}
                            title={'新增留言'}
                            onClick={() => addComment({key: item.key})}
                        />
                    }
                    <Icon.Pen
                        size={icon_size_m}
                        onClick={() => open({key: item.key, type: item.type})}
                    />
                    {
                        item.type === 'storage'
                        && <Icon.BarTop
                            size={icon_size_m}
                            title={'加入至資料夾'}
                            onClick={() => moveToStorageOrCollection({
                                key: item.key,
                                toWhere: 'toCollection'
                            })}
                        />
                    }
                    {
                        item.type === 'collection'
                        && <Icon.BarDown
                            size={icon_size_m}
                            title={'放入暫存區'}
                            onClick={() => moveToStorageOrCollection({key: item.key, toWhere: 'toStorage'})}
                        />
                    }
                </div>

            </DateBox>

            {/* editing 動畫 */}
            <EditToolbar open={openEditId === item.key}>
                <ShowEditCounting/>
                <div className={'icon-box'}>
                    <div className={'textingToolbar'}>
                        <div
                            className={'toggle-btn'}
                            onMouseDown={(e) => draftRef.current.toggleStyle('BOLD', e)}
                            style={toggleCSS.includes('BOLD') ? {fontWeight: 'bold'} : {}}
                        >
                            B
                        </div>
                        <div
                            className={'toggle-btn'}
                            onMouseDown={(e) => draftRef.current.toggleStyle('ITALIC', e)}
                            style={toggleCSS.includes('ITALIC') ? {fontStyle: 'italic'} : {}}
                        >
                            I
                        </div>
                        <div
                            className={'toggle-btn'}
                            style={toggleCSS.includes('STRIKETHROUGH') ? {textDecoration: 'line-through'} : {}}
                            onMouseDown={(e) => draftRef.current.toggleStyle('STRIKETHROUGH', e)}
                        >
                            S
                        </div>
                        <div
                            className={'toggle-btn'}
                            style={toggleCSS.includes('UNDERLINE') ? {textDecoration: 'underline'} : {}}
                            onMouseDown={(e) => draftRef.current.toggleStyle('UNDERLINE', e)}
                        >
                            U
                        </div>

                    </div>
                    <Icon.Save
                        size={icon_size_m}
                        title={'儲存'}
                        onClick={() => leaveEdit()}
                    />
                    <Icon.Delete
                        size={icon_size_m}
                        title={'刪除'}
                        onClick={() => deleteNoteOrComment()}
                    />
                </div>
            </EditToolbar>

        </TextingToolbar>
    );
};

