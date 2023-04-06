import React from 'react';
import styled from "styled-components";
import {global} from "../../assets/global";
import Icon from '../../assets/svg.jsx'
import {
    addAddComment,
    addDeleteNoteOrComment,
    addEditCollectionOrStorage,
    // addMoveToCollection,
    addMoveToStorageOrCollection,
    addOpenEditToolbar,
    addSetFocusFlag,
    addUseTool,
    selectCollection
} from "../../redux/slice/collectionSlice";
import {useDispatch, useSelector} from "react-redux";
import ShowEditCounting from './EditingCounting.jsx'

const {tertiary, icon_size_m, icon_size_l, icon_size_s} = global

const Toolbar = styled.div`
    position: relative;
    width: 100%;
    height: 30px;
    overflow: hidden;
    padding-top: 6px;`

const DateBox = styled.div`
    display: flex;
    padding: 0;
    transition: 0.2s ease-out ${p => p.open ? '' : '200ms'};
    transform: translateY(${p => p.open ? '-27px' : '0px'});
    color: ${tertiary};
    > span {
        display: block;
        font-size: 9px;
        transform: translateY(-30%);
        color: ${tertiary};
        padding-top: 6px;
    }`
const BuildDate = styled.div`
    margin-right: auto;
    font-size: 9px;
    margin-top: 1px;
    color: ${tertiary};`

const EditToolbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.2s ease-out ${p => p.open ? '200ms' : ''};
    transform: translateY(${p => p.open ? '0px' : '-20px'}); 
    color: ${tertiary};
    > div {
        font-size: 9px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > div {
            margin-left: 20px;
        }
    }`


export default function App(p) {
    const dispatch = useDispatch()
    let {
        item,
        saveEdit = () => {}
    } = p
    const {openEditId, openEditType, useTool} = useSelector(selectCollection)

    const open = (payload) => {
        dispatch(addSetFocusFlag(true))
        dispatch(addOpenEditToolbar(payload))
    }

    const usingTool = (type) => {
        if (type === 'enter') dispatch(addUseTool(true))
        else if (type === 'leave') dispatch(addUseTool(false))
    }

    /* 新增註記(comment) */
    const addComment = (payload) => {
        dispatch(addSetFocusFlag(true))
        dispatch(addAddComment(payload))
    }

    /* 刪除 Note */
    const deleteNoteOrComment = () => {
        dispatch(addDeleteNoteOrComment({area: area}))

    }

    /* 移至storage OR collection */
    const moveToStorageOrCollection = (payload) => {
        dispatch(addMoveToStorageOrCollection(payload))
    }
    // const moveToCollection = (payload) => {
    //     dispatch(addMoveToCollection(payload))
    // }

    /* 儲存編輯 */
    const leaveEdit = () => {
        if (useTool) return
        const newMsg = saveEdit()
        dispatch(addEditCollectionOrStorage({msg: newMsg, area: item.type}))
        dispatch(addOpenEditToolbar(''))
    }

    return (
        <Toolbar>

            {/* date place */}
            <DateBox open={openEditId === item.key}>
                <BuildDate comment={item.type === 'comment'}>{item.currentDate}</BuildDate>
                {
                    item.type === 'comment' || item.type === 'storage'
                        ? ''
                        : <Icon.Chat
                            size={icon_size_m}
                            title={'新增留言'}
                            onClick={() => addComment({key: item.key})}/>

                }
                {
                    item.type !== 'storage'
                        ? ''
                        : <Icon.BarTop
                            size={icon_size_m}
                            title={'加入至資料夾'}
                            onClick={() => moveToStorageOrCollection({
                                key: item.key,
                                toWhere: 'toCollection'
                            })}
                        />

                }
                <Icon.Pen
                    size={icon_size_m}
                    onClick={() => open({key: item.key, type: item.type})}
                />
                {
                    item.type === 'comment' || item.type === 'storage'
                        ? ''
                        : <Icon.BarDown
                            size={icon_size_m}
                            title={'放入暫存區'}
                            onClick={() => moveToStorageOrCollection({
                                key: item.key,
                                toWhere: 'toStorage'
                            })}
                        />
                }
            </DateBox>

            {/* editing 動畫 */}
            <EditToolbar
                open={openEditId === item.key}>
                <ShowEditCounting/>
                <div
                    onMouseEnter={() => usingTool('enter')}
                    onMouseLeave={() => usingTool('leave')}>

                    <Icon.Save
                        size={icon_size_m}
                        title={'儲存'}
                        onClick={() => leaveEdit()}
                    />

                    <Icon.Delete
                        size={icon_size_m}
                        title={'刪除'}
                        onClick={() => deleteNoteOrComment()}/>
                </div>
            </EditToolbar>

        </Toolbar>
    );
};

