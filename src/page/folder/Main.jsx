import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
    addDeleteFolder,
    addEditFolderAnimationId,
    addEditFolderId,
    addRearrangeFolder,
    selectFolder,
} from "../../redux/slice/folderSlice";
import { selectGlobal } from "../../redux/slice/globalSlice";
import { selectCollection } from "../../redux/slice/collectionSlice";
import useHideBar from "../../hooks/useHideBar";
import AddNewFolder from "../../component/optimizationComponent/folder/AddingNewFolder.jsx";
import Warning from "../../component/optimizationComponent/Warning.jsx";
import DeletingCheck from "../../component/optimizationComponent/DeletingCheck.jsx";
import BottomBar from "../../component/optimizationComponent/bottomBar/BottomBar.jsx";
import FolderBlock from "../../component/optimizationComponent/folder/FolderBlock.jsx";
import Navbar from "../../component/optimizationComponent/navbar/Navbar.jsx";
import useRemoveBar from "../../hooks/useRemoveBar";
import useCheckHistory from "../../hooks/useCheckHistory";


const Folders = styled.div`
    position: relative;
    width: ${({ config }) => config.max_width}px;
    height: ${({ config }) => config.max_height}px;
    overflow: hidden;;`

const FolderSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: ${({ config }) => config.max_height}px;
    padding: 48px 0 48px 0;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${({ config }) => config.tertiary};
        border-radius: 2.5px;
    }`

const DraggableBox = styled.div`
    display: grid;
    grid-template-rows: 10px 70px 10px;
`


export default function App() {
    const dispatch = useDispatch()
    const {
        Juuten_folderLists,
        editFolderId,
        addFolderAnimationId,
    } = useSelector(selectFolder)
    const { Juuten_Storage, isHistoryLoad } = useSelector(selectCollection)
    const { configuration: config } = useSelector(selectGlobal)
    const folderRef = useRef(null)
    const hideNav = useHideBar(folderRef.current)

    const [delCheck, setDelCheck] = useState(false)
    const [sameName, setSameName] = useState(false)
    const [illigalName, setIlligalName] = useState(false)
    const [newFolder, setNewFolder] = useState(false)


    /* 點擊 Folder 工具列外隱藏工具列 */
    useRemoveBar(editFolderId, () => dispatch(addEditFolderId('')))
    useCheckHistory()

    useMemo(() => {
        setTimeout(() => {
            dispatch(addEditFolderAnimationId())
        }, 0)
    }, [addFolderAnimationId])


    /* 刪除資料夾的第 2/2 步驟 */
    const doubleDelCheck = () => {
        setDelCheck(false)
        console.log('delete')
        dispatch(addDeleteFolder(editFolderId))
        dispatch(addEditFolderId())
    }

    /* 資料夾拖移後啟動 */
    function dragEnd(e) {
        const { destination, source } = e
        dispatch(addRearrangeFolder({ destination, source }))
    }

    /* 檢查名稱是否合法 */
    function checkLigalName(value) {
        const regex = /['"]/
        if (regex.test(value)) {
            setIlligalName(true)
            const timer = setTimeout(() => setIlligalName(false), 3000)
            return () => clearTimeout(timer)
        }
        if (Juuten_folderLists.find(folder => folder.name === value)) {
            setSameName(true)
            const timer = setTimeout(() => setSameName(false), 3000)
            return () => clearTimeout(timer)
        }
        return false
    }

    return isHistoryLoad
        && <Folders config={config}>
            <Warning warning={illigalName}>資料夾名稱不能含有 ' "</Warning>
            <Warning warning={sameName}>資料夾名稱重複</Warning>

            <DeletingCheck
                delCheck={delCheck}
                setDelCheck={setDelCheck}
                doubleDelCheck={doubleDelCheck}
            />

            <Navbar
                hide={hideNav}
                area={'home'}
                name={''}
            />


            <DragDropContext onDragEnd={(e) => dragEnd(e)}>
                <FolderSection
                    config={config}
                    ref={folderRef}
                >
                    <Droppable droppableId={`folder_drog_key`}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {/* 新增資料夾 */}
                                <AddNewFolder 
                                checkName={checkLigalName} 
                                newFolder={newFolder} 
                                setNewFolder={setNewFolder} />

                                {Juuten_folderLists.map((item, idx) =>
                                (<Draggable
                                    key={`folder_drag_key_${item.key}`}
                                    draggableId={`draggableId_${item.key}`}
                                    index={idx}
                                >
                                    {(provided) =>
                                    (<DraggableBox
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <FolderBlock
                                            item={item}
                                            setDelCheck={setDelCheck}
                                            openToolbar={item.key === editFolderId}
                                            checkName={checkLigalName}
                                            provided={provided}
                                        />
                                    </DraggableBox>)
                                    }
                                </Draggable>)
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </FolderSection>
            </DragDropContext>


            <BottomBar
                barArea={'folder'}
                hide={hideNav}
                storageLen={Juuten_Storage.length}
            />

        </Folders>

}
