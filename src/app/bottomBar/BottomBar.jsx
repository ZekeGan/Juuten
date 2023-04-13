import React from 'react';
import styled from "styled-components";
import {
    addOpenBar,
    addOpenStorage,
    addEditNote,
    addOpenEditToolbar,
    addSetFocusFlag, addAddNewNote, selectCollection, addOpenAddNewNote, addOpenSearchPage
} from "../../redux/slice/collectionSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {global} from "../../assets/global";

import Icon from "../../assets/svg.jsx";

const {primary, warning, main, font_size_m, font_size_s, max_width, icon_size_l} = global

/* style */
const BottomBar = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
    width: ${max_width}px;
    height: 48px;
    background-color: rgba(255,255,255);
    border: 1px solid ${primary};
    display: flex;
    align-items: center;
    justify-content: space-around;
    > input {
        width: 300px;
        height: 25px;
        border-radius: 12.5px;
        border: none;
        background-color: ${primary};
        outline: none;
        padding-left: 15px;
        font-size: ${font_size_m}px;
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
        background-color: ${warning};
        color: white;
        font-style: normal;   
        font-size: ${font_size_s}px;
        line-height: 15px;
        text-align: center;
        cursor: pointer;
    }`




const App = () => {
    const {
        Juuten_Storage: storage,
    } = useSelector(selectCollection)
    const dispatch = useDispatch()

    const openStorage = () => {
        dispatch(addOpenStorage('open'))
    }
    const openBar = () => {
        dispatch(addOpenBar('open'))
    }
    const addNewNote = () => {
        // dispatch(addSetFocusFlag(true))
        // dispatch(addAddNewNote())
        dispatch(addOpenAddNewNote('open'))
    }

    function searchNote() {
        dispatch(addOpenSearchPage('open'))
    }


    return (
        <BottomBar>
            <Icon.Search
                title={'搜尋筆記'}
                size={icon_size_l}
                styled={{color: main}}
                onClick={() => searchNote()}
            />


            {/* 加入新筆記 */}
            <Icon.Plus
                title={'新增筆記'}
                size={icon_size_l}
                styled={{color: main}}
                onClick={() => addNewNote()}/>


            {/* 顯示暫存區數量 */}
            <StorageCount onClick={() => openStorage()}>
                <Icon.Box
                    title={'置物區'}
                    size={icon_size_l}
                    styled={{color: main}}
                />
                {
                    storage.length === 0
                        ? ''
                        : <i>{storage.length}</i>
                }
            </StorageCount>

            {/* 更多工具 Icon */}
            <Icon.Bar
                title={'更多'}
                size={icon_size_l}
                styled={{color: main}}
                onClick={() => openBar('open')}
            />

        </BottomBar>
    );
};

export default App;
