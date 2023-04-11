import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import collectionSlice, {
    addAddFolderId,
    addOpenStorage,
    addRearrangeNote,
    selectCollection
} from "../../redux/slice/collectionSlice";
import {global} from "../../assets/global";

import Storage from "../bottomBar/storage/Storage.jsx";
import Bar from "../bottomBar/bar/Bar.jsx";
import TextMain from "./textArea/TextMain.jsx";
import BottomBar from "../bottomBar/BottomBar.jsx";
import {useParams} from "react-router-dom";
import AddNewNote from "../bottomBar/addNewNote/AddNewNote.jsx";
import Warning from "../../component/Warning.jsx";
import SearchNote from "../bottomBar/search/SearchNote.jsx";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";


const {main, primary, transition_speed1, max_height, max_width} = global


const Main = styled.div`
    width: ${max_width}px;
    height: ${max_height}px;
    position: relative;
    overflow: hidden;
    background-color: ${primary};`


const Mask = styled.div`
    ${transition_speed1}
    position: absolute;
    z-index: ${({open}) => open ? '2' : '0'};
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,${({open}) => open ? '0.5' : '0'});`


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


    function dragEnd(e) {
        const {destination, source} = e
        if (!destination || !source) return
        dispatch(addRearrangeNote({
            destination,
            source
        }))
    }

    return (
        <Main>
            <Mask
                open={obj.openStorage || obj.openBar || obj.openAddNewNote}
                onClick={() => close()}
            />

            {/* 顯示筆記地方 */}
            <DragDropContext
                onDragEnd={(e) => dragEnd(e)}
            >
                <Droppable droppableId="drop-id">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <TextMain
                                obj={obj}
                                id={id}
                                noteProvided={provided}
                                saveWarning={saveWarning}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>


            <AddNewNote/>
            <Storage/>
            <Bar/>
            <SearchNote/>

            <BottomBar
                setSaveWarning={setSaveWarning}
            />
        </Main>
    );
}

