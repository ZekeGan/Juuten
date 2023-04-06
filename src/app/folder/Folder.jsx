import React, {useState, useEffect, useMemo, useRef} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {
    addEditFolderAnimationId,
    addEditFolderId,
    addFolderEdit,
    addSetFolderAutoFocusId,
    selectFolder,
} from "../../redux/slice/folderSlice";
import {useNavigate} from "react-router-dom";
import {global} from "../../assets/global";
import Icon from '../../assets/svg.jsx'
import Navbar from "./FolderNavbar.jsx";
import AddNewFolder from "./AddingNewFolder.jsx";
import Warning from "../component/Warning.jsx";
import Toolbar from "./Toolbar.jsx";
import DeletingCheck from "./DeletingCheck.jsx";
import Tag from './Tag.jsx'
import FolderName from "./FolderName.jsx";
import {addFetchData} from "../../redux/slice/collectionSlice";
import BottomBar from "../component/BottomBar.jsx";
import Storage from "../collection/storage/Storage.jsx";
import Bar from "../collection/bar/Bar.jsx";

const {primary, secondary, tertiary, transition_speed1, warning} = global


const Folders = styled.div`
    position: relative;
    width: 450px;
    height: 600px;
    overflow: hidden;
    user-select: none;`
const FolderSection = styled.div`
    position: relative;
    width: 450px;
    height: calc(600px - 48px);
    overflow: scroll;
    overflow-x: hidden;
    padding: 20px 20px;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${secondary};
        border-radius: 5px;
    }`

/* folders */
const Folder = styled.div`
    position: relative;
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0;
    border-radius: 10px;    
    background-color: ${p => p.folderColor};
    // overflow: hidden;
    ${transition_speed1}
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
    > div > svg {
        opacity: ${({open}) => open ? 0 : 1};
    }`


/* icon style */
const styleIcon = `
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    color: ${primary};`


export default function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {Juuten_folderLists, editFolderId, addFolderAnimationId, folderAutoFocusId} = useSelector(selectFolder)
    const [regTest, setRegTest] = useState(false)
    const [sameName, setSameName] = useState(false)
    const [delCheck, setDelCheck] = useState(false)
    const childRef = useRef()


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

    /* editFolderId === '' 代表沒有在編輯資料夾
             * 在編輯A資料夾 無法進入A資料夾
             * */
    const goIntoFolder = (e, index) => {
        e.stopPropagation()
        navigate('/collection/N1') // *****************************************<==== delete when build

        // if (editFolderId || editFolderId === index) return
        // console.log('enterFolder')
        // const fn = () => navigate(`/collection/${index}`)
        // dispatch(addFetchData({
        //     index,
        //     fn
        // }))
    }


    const editFolder = (item) => {
        dispatch(addEditFolderId(item.key))
        // dispatch(addSetFolderAutoFocusId(item.key))
    }

    // const leaveEdit = (e) => {
    //     e.stopPropagation()
    //     if (editFolderId) dispatch(addEditFolderId(''))
    //     // dispatch(addSetFolderAutoFocusId(''))
    //
    // }


    return (
        <Folders>


            <Warning
                warning={regTest}>
                資料夾名稱不能含有 \ / : * ? ' " &lt; &gt; |
            </Warning>
            <Warning
                warning={sameName}>
                資料夾名稱重複
            </Warning>


            <DeletingCheck
                delCheck={delCheck}
                setDelCheck={() => setDelCheck()}/>

            <FolderSection>

                {/* 新增資料夾 */}
                <AddNewFolder
                    ref={childRef}
                    setRegTest={setRegTest}
                    setSameName={setSameName}
                />

                {/* 資料夾列表 */}
                {
                    Juuten_folderLists.map(item => (
                        <Folder
                            key={item.key}
                            id={`Juuten_folder_${item.key}`}
                            onDoubleClick={(e) => goIntoFolder(e, item.key)}
                            open={editFolderId === item.key}
                            folderColor={item.folderColor}
                            animation={item === addFolderAnimationId}
                        >
                            <Icon.Ellipsis
                                styled={styleIcon}
                                onClick={() => editFolder(item)}/>

                            {
                                item.key === editFolderId
                                    ? <Toolbar
                                        item={item}
                                        setDelCheck={setDelCheck}
                                        setSameName={setSameName}/>
                                    : ''
                            }

                            <FolderName
                                font={item.font}>
                                {item.name}
                            </FolderName>

                            {/*{*/}
                            {/*    item.tags.length > 0*/}
                            {/*    && <Tag item={item}/>*/}
                            {/*}*/}

                        </Folder>
                    ))
                }
            </FolderSection>

            <Storage/>

            <Bar/>

            <BottomBar area={'home'}/>
        </Folders>
    );
}
export {Folder}

// var color = 0.213 * rgbArr[0] + 0.715 * rgbArr[1] + 0.072 * rgbArr[2] > 255 / 2;