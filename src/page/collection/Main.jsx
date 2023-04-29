import React, { useState } from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectCollection } from "../../redux/slice/collectionSlice";
import { selectGlobal } from "../../redux/slice/globalSlice";
import { useParams } from "react-router-dom";

import TextMain from "./TextMain.jsx";
import Warning from "../../component/optimizationComponent/Warning.jsx";
import BottomBar from "../../component/optimizationComponent/bottomBar/BottomBar.jsx";
import Navbar from "../../component/optimizationComponent/navbar/Navbar.jsx";




const Main = styled.div`
    width: ${({ config }) => config.max_width}px;
    height: ${({ config }) => config.max_height}px;
    position: relative;
    overflow: hidden;
    background-color: ${({ config }) => config.primary};`


export default function App() {
    const {
        [useParams().id]: currData,
        folderData,
        openEditId,
        Juuten_Storage
    } = useSelector(selectCollection)
    const { configuration: config } = useSelector(selectGlobal)
    const [saveWarning, setSaveWarning] = useState(false)
    const [hide, setHide] = useState(false)

    console.log(currData);

    return (
        <Main config={config}>

            <Warning warning={saveWarning}>請儲存後再離開</Warning>

            <Navbar
                hide={hide}
                name={folderData.name}
                setSaveWarning={setSaveWarning}
                openEditId={openEditId}
            />

            {/* 顯示筆記地方 */}
            <TextMain
                data={currData}
                area={'textMain'}
                barArea={'textMain'}
                setHide={setHide}
            />

            <BottomBar
                barArea={'collection'}
                hide={hide}
                storageLen={Juuten_Storage.length}
            />

        </Main>
    )
}

