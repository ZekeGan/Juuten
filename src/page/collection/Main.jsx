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

import Storage from "../bottomBar/storage/Storage.jsx";
import Bar from "../bottomBar/bar/Bar.jsx";
import BottomBar from "../bottomBar/BottomBar.jsx";
import TextMain from "./textArea/TextMain.jsx";
import AddNewNote from "../bottomBar/addNewNote/AddNewNote.jsx";
import SearchNote from "../bottomBar/search/SearchNote.jsx";

import Navbar from "../navbar/Navbar.jsx";
import Mask from "../../component/pureComponent/Mask.jsx";


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
    const obj = useSelector(selectCollection)
    const {Juuten_folderLists} = useSelector(selectFolder)
    const {configuration: config} = useSelector(selectGlobal)
    const {openAddNewNote} = useSelector(selectCollection)
    const [saveWarning, setSaveWarning] = useState(false)
    const [hideNav, setHideNav] = useState(false)


    useEffect(() => {
        const [item] = Juuten_folderLists.filter(item => item.key === id)
        dispatch(addAddFolderId(
            item
        ))
    }, [])

    return (
        <Main config={config}>

            <Navbar
                hide={hideNav}
                text={obj.folderData.name}
                setSaveWarning={setSaveWarning}
            />

            <Mask open={openAddNewNote}/>


            {/* 顯示筆記地方 */}
            <div style={{gridRow: 1}}>
                <TextMain
                    obj={obj}
                    id={id}
                    setHideNav={setHideNav}
                    saveWarning={saveWarning}
                    area={'textMain'}
                />
            </div>

            <BottomBar setHideNav={setHideNav} hideNav={hideNav}/>


            <AddNewNote/>
            <Storage/>
            <Bar data={{[obj.folderData.name]: obj[id]}}/>
            <SearchNote/>

        </Main>
    );
}

