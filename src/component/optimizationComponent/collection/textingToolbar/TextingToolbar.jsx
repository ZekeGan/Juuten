import React from 'react';
import styled from "styled-components";
import Icon from '../../Svg.jsx'
import {
    addAddComment,
    addMoveToStorageOrCollection,
    addOpenEditToolbar,
} from "../../../../redux/slice/collectionSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectGlobal} from "../../../../redux/slice/globalSlice";
import BuiltDate from "../../pureComponent/BuiltDate.jsx";
import TextingToolbarInside from "./TextingToolbarInside.jsx";

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

const isEqual = (prevProps, nextProps) => {
    if (prevProps.open === nextProps.open && prevProps.inlineStyle === nextProps.inlineStyle) return true
    return prevProps === nextProps
}

const App = React.memo((
    {
        item,
        draftRef,
        showToolbar,
        open,
        inlineStyle,
        where
    }) => {
    const dispatch = useDispatch()
    const {configuration: config} = useSelector(selectGlobal)
    const openToolbar = (payload) => {
        dispatch(addOpenEditToolbar(payload))
    }

    console.log('toolbar')

    /* 新增註記(comment) */
    const addComment = (payload) => {
        dispatch(addAddComment(payload))
    }


    /* 移至storage OR collection */
    const moveToStorageOrCollection = (payload) => {
        dispatch(addMoveToStorageOrCollection(payload))
    }

    return (
        <TextingToolbar>
            <DateBox
                config={config}
                open={open}
            >
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
                        <div onClick={() => openToolbar({key: item.key, type: item.type})}>
                            <Icon.Pen size={config.icon_size_m}/>
                        </div>

                        {item.type === 'storage' && where !== 'folder'
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
                        && <div onClick={() => moveToStorageOrCollection({key: item.key, toWhere: 'toStorage'})}>
                            <Icon.BarDown
                                size={config.icon_size_m}
                                title={'放入暫存區'}
                            />
                        </div>}

                    </div>
                }


            </DateBox>
            {
                showToolbar
                && <TextingToolbarInside
                    item={item}
                    open={open}
                    draftRef={draftRef}
                    inlineStyle={inlineStyle}
                />
            }
        </TextingToolbar>
    );
}, isEqual)

export default App