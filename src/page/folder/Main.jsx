import React, {useState, useEffect, useMemo, useRef} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {
    addEditFolderAnimationId,
    addEditFolderId, addFolderEdit,
    addRearrangeFolder,
    selectFolder,
} from "../../redux/slice/folderSlice";
import {useNavigate} from "react-router-dom";
import {selectCollection} from "../../redux/slice/collectionSlice";

import AddNewFolder from "./AddingNewFolder.jsx";
import Warning from "../../component/pureComponent/Warning.jsx";
import DeletingCheck from "../../component/pureComponent/DeletingCheck.jsx";
import BottomBar from "../bottomBar/BottomBar.jsx";
import Storage from "../bottomBar/storage/Storage.jsx";
import Bar from "../bottomBar/bar/Bar.jsx";
import AddNewNote from "../bottomBar/addNewNote/AddNewNote.jsx";
import FolderBlock from "./FolderBlock.jsx";
import SearchNote from "../bottomBar/search/SearchNote.jsx";
import Mask from "../../component/pureComponent/Mask.jsx";
import Navbar from "../navbar/Navbar.jsx";
import {selectGlobal} from "../../redux/slice/globalSlice";
import ExportToHTML from "../../component/ExportToHTML.jsx";



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
    const {Juuten_folderLists, editFolderId, addFolderAnimationId, folderAutoFocusId} = useSelector(selectFolder)
    const collectionObj = useSelector(selectCollection)

    const [regTest, setRegTest] = useState(false)
    const [sameName, setSameName] = useState(false)
    const [delCheck, setDelCheck] = useState(false)
    const {configuration: config} = useSelector(selectGlobal)

    const allFoldersData = useMemo(() => {
        return Juuten_folderLists
            .reduce((output, {key, name}) => {
                if (!output[name] && !!collectionObj[key]) {
                    output[name] = []
                    output[name].push(...collectionObj[key])
                }
                return output
            }, {})
    }, [collectionObj.openBar])

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

    const doubleDelCheck = () => {
        setDelCheck(false)
        dispatch(addFolderEdit({type: 'delete', value: editFolderId}))
        dispatch(addEditFolderId())
    }


    function dragEnd(e) {
        const {destination, source} = e
        dispatch(addRearrangeFolder({
            destination,
            source
        }))
    }

    return (
        // <ExportToHTML data={allFoldersData} config={config}/>
        <Folders config={config}>
            <Warning warning={regTest}>資料夾名稱不能含有 \ / : * ? ' " &lt; &gt; |</Warning>
            <Warning warning={sameName}>資料夾名稱重複</Warning>
            <DeletingCheck
                delCheck={delCheck}
                setDelCheck={setDelCheck}
                doubleDelCheck={doubleDelCheck}
            />


            <Mask open={collectionObj.openAddNewNote}/>
            <Navbar area={'home'} text={'Juuten'}/>


            <DragDropContext onDragEnd={(e) => dragEnd(e)}>
                <Droppable droppableId={`folder_drog_key`}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <FolderSection config={config}>
                                {/* 新增資料夾 */}
                                <div>
                                    <AddNewFolder
                                        setRegTest={setRegTest}
                                        setSameName={setSameName}
                                    />
                                </div>
                                {
                                    Juuten_folderLists.map((item, idx) => (
                                        <FolderBlock
                                            key={item.key}
                                            item={item}
                                            idx={idx}
                                            setDelCheck={setDelCheck}
                                            setSameName={setSameName}
                                        />
                                    ))
                                }
                                {provided.placeholder}
                            </FolderSection>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>


            <SearchNote/>
            <Storage/>
            <AddNewNote/>
            <Bar area={'folder'} data={allFoldersData}/>
            <BottomBar/>
        </Folders>
    );
}

// var color = 0.213 * rgbArr[0] + 0.715 * rgbArr[1] + 0.072 * rgbArr[2] > 255 / 2;