import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import collectionSlice, {
    addAddFolderId,
    addOpenStorage,
    selectCollection
} from "../../redux/slice/collectionSlice";
import {global} from "../../assets/global";

import Storage from "../bottomBar/storage/Storage.jsx";
import Bar from "../bottomBar/bar/Bar.jsx";
import TextMain from "./textArea/TextMain.jsx";
import BottomBar from "../bottomBar/BottomBar.jsx";
import {useParams} from "react-router-dom";
import AddNewNote from "../bottomBar/addNewNote/AddNewNote.jsx";
import SearchNote from "../bottomBar/search/SearchNote.jsx";
import {selectFolder} from "../../redux/slice/folderSlice";
import Mask from "../../component/Mask.jsx";
import Bookmark from "../../component/Bookmark.jsx";


const {main, primary, transition_speed1, max_height, max_width, primary_opacity} = global


const Main = styled.div`
    display: grid;
    grid-template-rows: ${max_height - 48}px 48px auto;
    width: ${max_width}px;
    height: ${max_height}px;
    position: relative;
    overflow: hidden;
    background-color: ${primary};`






/*獲取資料的方式 :
*   1. 根據字串'Juuten_Folder'get 到資料夾的名稱，並map()資料夾列表
*   2. 點選進資料夾，利用動態路由生成頁面
*   3. 根據useParams獲取資料夾數據，get到資料夾數據的資料
*   4. 生成頁面資料
*   */
export default function App() {
    const [saveWarning, setSaveWarning] = useState(false)
    const dispatch = useDispatch()
    const {id} = useParams()
    const {Juuten_folderLists} = useSelector(selectFolder)
    const obj = useSelector(selectCollection)

    const close = () => dispatch(addOpenStorage())

    useEffect(() => {
        const [item] = Juuten_folderLists.filter(item => item.key === id)
        dispatch(addAddFolderId(
            item
        ))
    }, [])

    console.log(obj.folderData)


    return (
        <Main>

            <Mask
                open={obj.openBar || obj.openAddNewNote}
                onClick={close}
            />

            <Bookmark>
                <div>{obj.folderData.name}</div>
            </Bookmark>

            {/* 顯示筆記地方 */}
            <div style={{gridRow: 1}}>
                <TextMain
                    obj={obj}
                    id={id}
                    saveWarning={saveWarning}
                    area={'textMain'}
                />
            </div>

            <div style={{gridRow: 2}}>
                <BottomBar setSaveWarning={setSaveWarning}/>
            </div>

            <div style={{gridRow: 3}}>
                <AddNewNote/>
                <Storage/>
                <Bar/>
                <SearchNote/>
            </div>


        </Main>
    );
}

