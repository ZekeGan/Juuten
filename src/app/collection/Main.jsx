import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import collectionSlice, {addAddFolderId, addOpenStorage, selectCollection} from "../../redux/slice/collectionSlice";
import {global} from "../../assets/global";

import Storage from "./storage/Storage.jsx";
import Bar from "./bar/Bar.jsx";
import TextMain from "./textArea/TextMain.jsx";
import BottomBar from "../component/BottomBar.jsx";
import {useParams} from "react-router-dom";
import AddNewNote from "../AddNewNote.jsx";


const {main, primary, transition_speed1} = global


const Main = styled.div`
    position: relative;
    width: 450px;
    height: 600px;
    position: relative;
    overflow: hidden;
    background-color: ${primary};`


/* Icon */
const ellipsisIcon = `
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%) scale(1.1);
    color: ${main};
    cursor: pointer;`


const Mask = styled.div`
    ${transition_speed1}
    position: absolute;
    z-index: ${({open}) => open ? '1' : '0'};
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,${({open}) => open? '0.5' : '0'});`


/*獲取資料的方式 :
*   1. 根據字串'Juuten_Folder'get 到資料夾的名稱，並map()資料夾列表
*   2. 點選進資料夾，利用動態路由生成頁面
*   3. 根據useParams獲取資料夾數據，get到資料夾數據的資料
*   4. 生成頁面資料
*   */
export default function App() {
    const [saveWarning, setSaveWarning] = useState(false)
    const dispatch = useDispatch()
    const obj = useSelector(selectCollection)
    const {id} = useParams()

    const close = () => dispatch(addOpenStorage())

    useEffect(() => {
        dispatch(addAddFolderId(id))
    }, [])




    return (
        <Main>

            <Mask
                open={obj.openStorage || obj.openBar || obj.openAddNewNote}
                onClick={() => close()}
            />

            {/* 顯示筆記地方 */}
            <TextMain
                obj={obj}
                id={id}
                saveWarning={saveWarning}
            />

            <AddNewNote/>

            {/* 暫存區 */}
            <Storage/>

            {/* 更多工具 */}
            <Bar/>

            <BottomBar
                area={'collection'}
                setSaveWarning={setSaveWarning}
            />
        </Main>
    );
}

