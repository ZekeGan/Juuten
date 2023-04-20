import React, {useState, useEffect, useMemo, useRef} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {
    addEditFolderAnimationId,
    addEditFolderId, addFolderEdit,
    addRearrangeFolder,
    selectFolder,
} from "../../redux/slice/folderSlice";
import {selectGlobal} from "../../redux/slice/globalSlice";
import {selectCollection} from "../../redux/slice/collectionSlice";

import AddNewFolder from "../../component/optimizationComponent/folder/AddingNewFolder.jsx";
import Warning from "../../component/optimizationComponent/Warning.jsx";
import DeletingCheck from "../../component/optimizationComponent/DeletingCheck.jsx";
import BottomBar from "../../component/optimizationComponent/bottomBar/BottomBar.jsx";
import Storage from "../../component/optimizationComponent/bottomBar/storage/Storage.jsx";
import Bar from "../../component/optimizationComponent/bottomBar/bar/Bar.jsx";
import AddNewNote from "../../component/optimizationComponent/bottomBar/addNewNote/AddNewNote.jsx";
import FolderBlock from "../../component/optimizationComponent/folder/FolderBlock.jsx";
import SearchNote from "../../component/optimizationComponent/bottomBar/search/SearchNote.jsx";
import Mask from "../../component/optimizationComponent/pureComponent/Mask.jsx";
import Navbar from "../../component/optimizationComponent/navbar/Navbar.jsx";
import useHideBar from "../../hooks/useHideBar";


const Folders = styled.div`
    position: relative;
    width: ${({config}) => config.max_width}px;
    height: ${({config}) => config.max_height}px;
    overflow: hidden;
    user-select: none;`
const FolderSection = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: ${({config}) => config.max_height}px;
    padding: 48px 0 48px 0;
    overflow: scroll;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${({config}) => config.tertiary};
        border-radius: 5px;
    }`


export default function App() {
    const dispatch = useDispatch()
    const {Juuten_folderLists, editFolderId, addFolderAnimationId} = useSelector(selectFolder)
    const collectionObj = useSelector(selectCollection)
    const {Juuten_Storage, openAddNewNote, openBar} = useSelector(selectCollection)
    const {configuration: config} = useSelector(selectGlobal)

    const [regTest, setRegTest] = useState(false)
    const [delCheck, setDelCheck] = useState(false)
    const folderRef = useRef(null)
    const [reset, setReset] = useState(false)
    const hideNav = useHideBar(folderRef.current)

    /* 獲得所有資料夾內的所有檔案 */
    const allFoldersData = useMemo(() => {
        return Juuten_folderLists
            .reduce((output, {key, name}) => {
                if (!output[name] && !!collectionObj[key]) {
                    output[name] = []
                    output[name].push(...collectionObj[key])
                }
                return output
            }, {})
    }, [openBar])

    useEffect(() => {
        setReset(prev => !prev)
    }, [folderRef])


    /* ##新增資料夾後的動畫
    *    概念:
    *       1. 新增後把新增的 index值 賦予給 addFolderAnimationId
    *       2. map 比對所有資料和紀錄的 id 值，設為 true
    *       3. 當 useMemo 感受到變動 非同步再次設為 false
    *       4. 狀態改變 動畫啟動
    *  */
    useMemo(() => {
        setTimeout(() => {
            dispatch(addEditFolderAnimationId())
        }, 0)
    }, [addFolderAnimationId])

    /* 點擊 Folder 工具列外隱藏工具列 */
    function removeToolbar(e) {
        e.stopPropagation()
        dispatch(addEditFolderId(''))
        return document.removeEventListener('click', removeToolbar, false)
    }
    useEffect(() => {
        if (!!editFolderId) {
            document.addEventListener('click', removeToolbar, false)
        }
    }, [editFolderId])


    /* 刪除資料夾的第 2/2 步驟 */
    const doubleDelCheck = () => {
        setDelCheck(false)
        dispatch(addFolderEdit({type: 'delete', value: editFolderId}))
        dispatch(addEditFolderId())
    }

    /* 資料夾拖移後啟動 */
    function dragEnd(e) {
        const {destination, source} = e
        dispatch(addRearrangeFolder({destination, source}))
    }

    return (
        <Folders config={config}>
            <Warning warning={regTest}>資料夾名稱不能含有 \ / : * ? ' " &lt; &gt; |</Warning>
            <DeletingCheck
                delCheck={delCheck}
                setDelCheck={setDelCheck}
                doubleDelCheck={doubleDelCheck}
            />


            <Mask open={openAddNewNote}/>
            <Navbar hide={hideNav} area={'home'} name={'Juuten'}/>


            <DragDropContext onDragEnd={(e) => dragEnd(e)}>
                <Droppable droppableId={`folder_drog_key`}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <FolderSection config={config} ref={folderRef}>
                                {/* 新增資料夾 */}
                                <div>
                                    <AddNewFolder
                                        setRegTest={setRegTest}
                                    />
                                </div>
                                {Juuten_folderLists.map((item, idx) =>
                                    (<Draggable
                                        key={`folder_drag_key_${item.key}`}
                                        draggableId={`draggableId_${item.key}`}
                                        index={idx}
                                    >
                                        {(provided) =>
                                            (<div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                <FolderBlock
                                                    item={item}
                                                    setDelCheck={setDelCheck}
                                                    openToolbar={item.key === editFolderId}
                                                    provided={provided}
                                                />
                                            </div>)
                                        }
                                    </Draggable>)
                                )}
                                {provided.placeholder}
                            </FolderSection>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>


            <BottomBar
                hide={hideNav}
                storageLen={Juuten_Storage.length}
            />

            <SearchNote/>
            <Storage where={'folder'}/>
            <AddNewNote area={'folder'}/>
            <Bar
                area={'folder'}
                data={allFoldersData}
            />

        </Folders>
    );
}

// var color = 0.213 * rgbArr[0] + 0.715 * rgbArr[1] + 0.072 * rgbArr[2] > 255 / 2;