import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {
    addAddFolderId,
    addOpenStorage,
    selectCollection
} from "../../redux/slice/collectionSlice";
import {useParams} from "react-router-dom";
import {selectFolder} from "../../redux/slice/folderSlice";
import {selectGlobal} from "../../redux/slice/globalSlice";

import Storage from "../../component/optimizationComponent/bottomBar/storage/Storage.jsx";
import Bar from "../../component/optimizationComponent/bottomBar/bar/Bar.jsx";
import BottomBar from "../../component/optimizationComponent/bottomBar/BottomBar.jsx";
import TextMain from "./TextMain.jsx";
import AddNewNote from "../../component/optimizationComponent/bottomBar/addNewNote/AddNewNote.jsx";
import SearchNote from "../../component/optimizationComponent/bottomBar/search/SearchNote.jsx";

import Navbar from "../../component/optimizationComponent/navbar/Navbar.jsx";
import Mask from "../../component/optimizationComponent/pureComponent/Mask.jsx";


const Main = styled.div`
    display: grid;
    grid-template-rows: ${({config}) => config.max_height - 48}px 48px auto;
    width: ${({config}) => config.max_width}px;
    height: ${({config}) => config.max_height}px;
    position: relative;
    overflow: hidden;
    background-color: ${({config}) => config.primary};`


/*獲取資料的方式 :
*   1. 根據字串'Juuten_Folder'get 到資料夾的名稱，並map()資料夾列表
*   2. 點選進資料夾，利用動態路由生成頁面
*   3. 根據useParams獲取資料夾數據，get到資料夾數據的資料
*   4. 生成頁面資料
*   */
export default function App() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {openBar, [id]:currData, folderData} = useSelector(selectCollection)
    const {openAddNewNote, openEditId, Juuten_Storage} = useSelector(selectCollection)
    const {Juuten_folderLists} = useSelector(selectFolder)
    const {configuration: config} = useSelector(selectGlobal)

    const [saveWarning, setSaveWarning] = useState(false)
    const [hide, setHide] = useState(false)

    useEffect(() => {
        const [item] = Juuten_folderLists.filter(item => item.key === id)
        console.log(item)
        dispatch(addAddFolderId(item))
    }, [])


    return (
        <Main config={config}>
            <Navbar
                hide={hide}
                name={folderData.name}
                setSaveWarning={setSaveWarning}
                openEditId={openEditId}
            />

            <Mask open={openAddNewNote}/>


            {/* 顯示筆記地方 */}
            <div style={{gridRow: 1}}>
                <TextMain
                    data={currData}
                    hide={hide}
                    setHide={setHide}
                    saveWarning={saveWarning}
                    area={'textMain'}
                />
            </div>

            <BottomBar
                hide={hide}
                storageLen={Juuten_Storage.length}
            />


            <AddNewNote area={'collection'}/>
            <Storage/>
            <Bar data={{[folderData.name]: currData}} open={openBar}/>
            <SearchNote/>

        </Main>
    );
}

