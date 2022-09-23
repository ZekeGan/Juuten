import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import collectionSlice, {addAddFolderId, selectCollection} from "../../redux/slice/collectionSlice";
import {global} from "../../assets/global";

import Storage from "./Storage.jsx";
import Bar from "./Bar.jsx";
import TextArea from "./textArea/TextArea.jsx";
import Navbar from "./Navbar.jsx";
import {useParams} from "react-router-dom";


const {main, primary} = global


const Collection = styled.div`
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
const navbarIcon = `
    color: ${main};
    transform: scale(1.2);
    cursor: pointer;`


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

    useEffect(() => {
        dispatch(addAddFolderId(id))
    },[])


    return (
        <Collection openStorage={obj.openStorage}>

            {/* 導航欄 */}
            <Navbar storage={obj['Juuten_Storage']}
                    navbarIcon={navbarIcon}
                    setSaveWarning={setSaveWarning}
                    openEditId={obj.openEditId}/>


            {/* 顯示筆記地方 */}
            <TextArea obj={obj}
                      id={id}
                      saveWarning={saveWarning}/>


            {/* 暫存區 */}
            <Storage ellipsis={ellipsisIcon}
                     navbar={navbarIcon}/>


            {/* 更多工作區 */}
            <Bar ellipsis={ellipsisIcon}
                 navbar={navbarIcon}/>

        </Collection>
    );
}

