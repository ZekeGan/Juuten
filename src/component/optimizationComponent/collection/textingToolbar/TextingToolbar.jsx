import React, { useState } from 'react';
import styled from "styled-components";
import Icon from '../../Svg.jsx'
import {
    addAddComment,
    addDeleteNoteOrComment,
    addMoveToStorageOrCollection,
    addOpenEditToolbar,
} from "../../../../redux/slice/collectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectGlobal } from "../../../../redux/slice/globalSlice";
import BuiltDate from "../../pureComponent/BuiltDate.jsx";
import TextingToolbarInside from "./TextingToolbarInside.jsx";
import useRemoveBar from "../../../../hooks/useRemoveBar";

const TextingToolbar = styled.div`
    position: relative;
    width: 100%;
    height: 25px;
    overflow: hidden;`

const DateBox = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    transition: 0.2s ease-out ${p => p.open ? '' : '200ms'};
    transform: translateY(${p => p.open ? '-25px' : '0px'});
    color: ${({ config }) => config.quaternary};
    > div {
        font-size: ${({ config }) => config.font_size_s}px;
    }
    > .icon-box {
        display: flex;
        align-items: center;
        > div {
            margin-left: 30px;
        }
    }`

const DelBox = styled.div`
    display: ${({ open }) => open ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 15px;
    top: 30px;
    width: 80px;
    height: 35px;
    border-radius: 5px;
    background-color: ${({ config }) => config.secondary};
    // border: 1px solid ${({ config }) => config.quaternary};
    font-size: ${({ config }) => config.font_size_s}px;
    cursor: pointer;
    &:hover {
         background-color: ${({ config }) => config.tertiary};
    }`


const App = React.memo((
    {
        item,
        draftRef,
        showToolbar,
        open,
        inlineStyle,
        barArea,
    }) => {
    const dispatch = useDispatch()
    const { configuration: config } = useSelector(selectGlobal)
    const [delCheck, setDelCheck] = useState(false)
    useRemoveBar(delCheck, () => setDelCheck(false))

    function openToolbar() {
        dispatch(addOpenEditToolbar({ key: item.key, type: item.type }))
    }

    /* 新增註記(comment) */
    function addComment() {
        dispatch(addAddComment({ key: item.key }))
    }

    /* 移至storage OR collection */
    function moveToStorageOrCollection(payload) {
        dispatch(addMoveToStorageOrCollection(payload))
    }

    function deleteNoteOrComment(e) {
        e.stopPropagation()
        dispatch(addDeleteNoteOrComment({ area: item.type }))
        dispatch(addOpenEditToolbar(''))
    }

    return (
        <>
            <DelBox
                config={config}
                open={delCheck}
                onClick={deleteNoteOrComment}
            >
                確認刪除
            </DelBox>

            <TextingToolbar>
                <DateBox
                    config={config}
                    open={open}
                >
                    <BuiltDate date={item.currentDate} />
                    {showToolbar
                        && <div className={'icon-box'}>
                            {item.type === 'collection'
                                &&
                                <div onClick={addComment}>
                                    <Icon.Chat
                                        size={config.icon_size_m}
                                        title={'新增留言'}
                                    />
                                </div>}
                            <div onClick={openToolbar}>
                                <Icon.Pen size={config.icon_size_m} />
                            </div>

                            {(item.type === 'storage' && barArea !== 'folder')
                                && <div
                                    onClick={() => moveToStorageOrCollection({
                                        key: item.key,
                                        toWhere: 'toCollection'
                                    })}>
                                    <Icon.BarTop
                                        size={config.icon_size_m}
                                        title={'加入至資料夾'}
                                    />
                                </div>}

                            {item.type === 'collection'
                                && <div
                                    onClick={() => moveToStorageOrCollection({
                                        key: item.key,
                                        toWhere: 'toStorage'
                                    })}>
                                    <Icon.BarDown
                                        size={config.icon_size_m}
                                        title={'放入暫存區'}
                                    />
                                </div>}

                        </div>}


                </DateBox>
                {showToolbar
                    && <TextingToolbarInside
                        delCheck={delCheck}
                        setDelCheck={setDelCheck}
                        item={item}
                        open={open}
                        draftRef={draftRef}
                        inlineStyle={inlineStyle}
                    />}
            </TextingToolbar>
        </>
    );
},
    (prevProps, nextProps) => {
        if (prevProps.open === nextProps.open && prevProps.inlineStyle === nextProps.inlineStyle) return true
        return prevProps === nextProps
    })

export default App