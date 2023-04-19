import React from 'react';
import styled from "styled-components";
import {
    addOpenBar,
    addOpenStorage,
    selectCollection,
    addOpenAddNewNote,
    addOpenSearchPage
} from "../../../redux/slice/collectionSlice";
import {useDispatch, useSelector} from "react-redux";


import Icon from "../Svg.jsx";
import {selectGlobal} from "../../../redux/slice/globalSlice";

const BottomBar = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
    transform: translateY(${({hideNav}) =>　hideNav ? '48px' : '0'});
    transition: 0.2s ease-in;
    width: ${({config}) => config.max_width}px;
    height: 48px;
    background-color: rgba(255,255,255);
    border: 1px solid ${({config}) => config.primary};
    display: flex;
    align-items: center;
    justify-content: space-around;
    > input {
        width: 300px;
        height: 25px;
        border-radius: 12.5px;
        border: none;
        background-color: ${({config}) => config.primary};
        outline: none;
        padding-left: 15px;
        font-size: ${({config}) => config.font_size_m}px;
    }`
const StorageCount = styled.div`
    position: relative;
    > i {
        position: absolute;
        bottom: 5%;
        right: -30%;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: ${({config}) => config.main};
        color: white;
        font-style: normal;   
        font-size: ${({config}) => config.font_size_s}px;
        line-height: 15px;
        text-align: center;
        cursor: pointer;
    }`

export const isEqual = (prev, next) => {
    return prev.hide === next.hide && prev.storageLen === next.storageLen
}


const App = React.memo(({hide, storageLen = 0}) => {
    const {configuration: config} = useSelector(selectGlobal)
    const dispatch = useDispatch()

    const openStorage = () => {
        dispatch(addOpenStorage('open'))
    }
    const openBar = () => {
        dispatch(addOpenBar('open'))
    }
    const addNewNote = () => {
        dispatch(addOpenAddNewNote('open'))
    }

    function searchNote() {
        dispatch(addOpenSearchPage('open'))
    }

    console.log('bottomBar')


    return (
        <BottomBar
            config={config}
            hideNav={hide}
        >
            <div onClick={() => searchNote()}>
                <Icon.Search
                    title={'搜尋筆記'}
                    size={config.icon_size_l}
                    styled={`color: ${config.main};`}
                />
            </div>


            {/* 加入新筆記 */}
            <div onClick={() => addNewNote()}>
                <Icon.Plus
                    title={'新增筆記'}
                    size={config.icon_size_l}
                    styled={`color: ${config.main};`}
                />
            </div>


            {/* 顯示暫存區數量 */}
            <StorageCount config={config} onClick={() => openStorage()}>
                <title>置物區</title>
                <Icon.Box
                    title={'置物區'}
                    size={config.icon_size_l}
                    styled={`color: ${config.main};`}
                />
                {
                    (!config.showStorageCount && !!storageLen)
                    && <i>{storageLen}</i>

                }
            </StorageCount>

            {/* 更多工具 Icon */}
            <div onClick={() => openBar('open')}>
                <Icon.Bar
                    title={'更多'}
                    size={config.icon_size_l}
                    styled={`color: ${config.main};`}
                />
            </div>

        </BottomBar>
    );
}, isEqual)

export default App;
