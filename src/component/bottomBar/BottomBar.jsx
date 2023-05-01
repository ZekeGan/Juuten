import React, { useState } from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectGlobal } from "slice/globalSlice";

import Icon from "com/Svg.jsx";
import SearchNote from "./search/SearchNote.jsx";
import Storage from "./storage/Storage.jsx";
import AddNewNote from "./addNewNote/AddNewNote.jsx";
import Bar from "./bar/Bar.jsx";
import Mask from "com/pure/Mask.jsx";

const BottomBar = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
    transform: translateY(${({ hideNav }) => hideNav ? '48px' : '0'});
    transition: 0.2s ease-in;
    width: ${({ config }) => config.max_width}px;
    height: 48px;
    background-color: rgba(255,255,255);
    border: 1px solid ${({ config }) => config.primary};
    display: flex;
    align-items: center;
    justify-content: space-around;
    > input {
        width: 300px;
        height: 25px;
        border-radius: 12.5px;
        border: none;
        background-color: ${({ config }) => config.primary};
        outline: none;
        padding-left: 15px;
        font-size: ${({ config }) => config.font_size_m}px;
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
        background-color: ${({ config }) => config.main};
        color: white;
        font-style: normal;   
        font-size: ${({ config }) => config.font_size_s}px;
        line-height: 15px;
        text-align: center;
        cursor: pointer;
    }`




const App = React.memo((
    {
        hide,
        storageLen = 0,
        barArea,
    }) => {
    const { configuration: config } = useSelector(selectGlobal)

    const [openStorage, setOpenStorage] = useState(false)
    const [openBar, setOpenBar] = useState(false)
    const [openNewNote, setOpenNewNote] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)

    function clickToClose() {
        setOpenNewNote(false)
    }

    return (
        <>
            <Mask
                open={openNewNote}
                onClick={clickToClose}
            />

            <BottomBar
                config={config}
                hideNav={hide}
            >
                <div onClick={() => setOpenSearch(true)} >
                    <Icon.Search
                        title={'搜尋筆記'}
                        size={config.icon_size_xl}
                        styled={`color: ${config.main};`}
                    />
                </div>

                <div onClick={() => setOpenNewNote(true)} >
                    <Icon.Plus
                        title={'新增筆記'}
                        size={config.icon_size_xl}
                        styled={`color: ${config.main};`}
                    />
                </div>

                <StorageCount
                    config={config}
                    onClick={() => setOpenStorage(true)}
                >
                    <Icon.Box
                        title={'置物區'}
                        size={config.icon_size_xl}
                        styled={`color: ${config.main};`}
                    />
                    {
                        (!config.showStorageCount && !!storageLen)
                        && <i>{storageLen}</i>

                    }
                </StorageCount>

                <div onClick={() => setOpenBar(true)} >
                    <Icon.Bar
                        title={'更多'}
                        size={config.icon_size_xl}
                        styled={`color: ${config.main};`}
                    />
                </div>
            </BottomBar>

            <SearchNote
                open={openSearch}
                setOpen={setOpenSearch}
            />

            <Storage
                barArea={barArea}
                open={openStorage}
                setOpen={setOpenStorage}
            />

            <AddNewNote
                barArea={barArea}
                open={openNewNote}
                setOpen={setOpenNewNote}
            />

            <Bar
                barArea={barArea}
                open={openBar}
                setOpen={setOpenBar}
            />

        </>

    );
},
    (prev, next) => prev.hide === next.hide && prev.storageLen === next.storageLen
)

export default App;
