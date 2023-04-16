import React from 'react';
import styled from "styled-components";
import Icon from '../../pureComponent/Svg.jsx'
import {
    addAddComment,
    addDeleteNoteOrComment,
    addEditCollectionOrStorage,
    addMoveToStorageOrCollection,
    addOpenEditToolbar,
    selectCollection
} from "../../../redux/slice/collectionSlice";
import {useDispatch, useSelector} from "react-redux";
import ShowEditCounting from '../../EditingCounting.jsx'
import {convertToRaw} from "draft-js";
import {selectGlobal} from "../../../redux/slice/globalSlice";
import BuiltDate from "../../pureComponent/BuiltDate.jsx";
import {toggleProps} from "../../../assets/global";
import TextEditorIcon from "../../pureComponent/TextEditorIcon.jsx";

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
    color: ${({config}) => config.quaternary};
    > div {
        font-size: ${({config}) => config.font_size_s}px;
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
    color: ${({config}) => config.quaternary};
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
    let {item, draftRef, showToolbar} = p
    const {openEditId, openEditType, useTool, toggleCSS} = useSelector(selectCollection)
    const {configuration: config} = useSelector(selectGlobal)
    const open = (payload) => {
        dispatch(addOpenEditToolbar(payload))
    }

    /* 新增註記(comment) */
    const addComment = (payload) => {
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

    function handleToggleStyle(keyword, e) {
        draftRef.current?.toggleStyle(keyword, e)
    }

    return (
        <TextingToolbar>
            {/* date place */}
            <DateBox config={config} open={openEditId === item.key}>
                <BuiltDate date={item.currentDate}/>
                {
                    showToolbar
                    && <div className={'icon-box'}>
                        {
                            item.type === 'collection'
                            &&
                            <div onClick={() => addComment({key: item.key})}>
                                <Icon.Chat
                                    size={config.icon_size_m}
                                    title={'新增留言'}
                                />
                            </div>
                        }
                        <div onClick={() => open({key: item.key, type: item.type})}>
                            <Icon.Pen size={config.icon_size_m}/>
                        </div>
                        {
                            item.type === 'storage'
                            && <div onClick={() => moveToStorageOrCollection({
                                key: item.key,
                                toWhere: 'toCollection'
                            })}>
                                <Icon.BarTop
                                    size={config.icon_size_m}
                                    title={'加入至資料夾'}
                                />
                            </div>

                        }
                        {
                            item.type === 'collection'
                            && <div onClick={() => moveToStorageOrCollection({key: item.key, toWhere: 'toStorage'})}>
                                <Icon.BarDown
                                    size={config.icon_size_m}
                                    title={'放入暫存區'}
                                />
                            </div>
                        }
                    </div>
                }


            </DateBox>

            {
                showToolbar
                && <EditToolbar config={config} open={openEditId === item.key}>
                    <ShowEditCounting open={openEditId === item.key}/>
                    <div className={'icon-box'}>
                        <div className={'textingToolbar'}>
                            {
                                toggleProps.map((toggle) => (
                                    <TextEditorIcon
                                        key={`textEditorIcon_${toggle.icon}`}
                                        icon={toggle.icon}
                                        style={toggleCSS.includes(toggle.keyword) ? toggle.style : ''}
                                        keyword={toggle.keyword}
                                        fn={(e) => handleToggleStyle(toggle.keyword, e)}
                                        curr={openEditId === item.key}
                                    />
                                ))
                            }

                        </div>
                        <div onClick={() => leaveEdit()}>
                            <Icon.Save
                                size={config.icon_size_m}
                                title={'儲存'}
                            />
                        </div>

                        <div onClick={() => deleteNoteOrComment()}>
                            <Icon.Delete
                                size={config.icon_size_m}
                                title={'刪除'}
                            />
                        </div>
                    </div>
                </EditToolbar>
            }


        </TextingToolbar>
    );
};

