import React, {useState, useEffect, useLayoutEffect} from 'react';
import Icon from "../../assets/svg.jsx";
import {Folder} from "./Folder.jsx"
import {addEditFolderId, addFolderAdd, selectFolder} from "../../redux/slice/folderSlice";
import {global} from "../../assets/global";
import {useDispatch, useSelector} from "react-redux";

const {primary, secondary, transition_speed1} = global


const styleAddFolderIcon = `
    width: 40%;
    color: ${primary};`
const styleX = `
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: ${primary};
    transform: scale(1.5);
    margin: 0 7px;
`

const MyComponent = (p) => {
    const [newFolder, setNewFolder] = useState(false)
    const [animationFlag, setAnimationFlag] = useState(false)
    const {Juuten_folderLists} = useSelector(selectFolder)
    const dispatch = useDispatch()
    const {setRegTest, setSameName, setFolderAnimation, setFolderAnimationShow} = p
    const regular = /[:\\\/*?'"<>|]/

    const addNewFolder = () => {
        dispatch(addEditFolderId())
        setNewFolder(true)
    }

    const textareaAutoResize = (ta) => {
        // ta.style.height = `${ta.scrollHeight}px`
    }

    const stopCreateNewFolder = () => {
        document.querySelector('.Juuten_newFolder').value = ''
        setNewFolder(false)
    }

    const createdNewFolder = () => {
        let value = document.querySelector('.Juuten_newFolder').value
        if (value === '') return setNewFolder(false)
        else if (regular.test(value)) {
            /* 檢測是否有違規名稱 */
            setRegTest(regular.test(value))
            setTimeout(() => void setRegTest(false), 3000)
            return
        } else if (Juuten_folderLists.find(item => item.name === value)) {
            /* 檢測是否有重複名稱 */
            setSameName(true)
            setTimeout(() => void setSameName(false), 3000)
            return
        }
        setNewFolder(false)


        /* 設定資料夾檔案結構 */
        const index = `${value.replaceAll(' ', '_')}_${Date.now()}`
        dispatch(addFolderAdd({
            index, // 唯一的index value
            name: value,
            folderColor: secondary
        }))
        /* 清空並回歸原本狀態 */
        document.querySelector('.Juuten_newFolder').value = ''

    }


    return (
        <Folder key='Juuten_addNewFolder' add={newFolder} folderColor={secondary}>
            <div className="container iconActive" onClick={() => addNewFolder()}>
                <Icon.Plus styled={styleAddFolderIcon}/>
            </div>
            <div className="container textActive">
                <div className="addNewIcon">
                    <Icon.X styled={styleX} onClick={() => stopCreateNewFolder()}/>
                    <Icon.Check styled={styleX} onClick={() => createdNewFolder()}/>
                </div>
                <textarea rows='1' className='Juuten_newFolder' onInput={(e) => textareaAutoResize(e.target)}/>

            </div>
        </Folder>
    );
};

export default MyComponent;
