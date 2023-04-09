import React, {useState, forwardRef, useImperativeHandle} from 'react';
import Icon from "../assets/svg.jsx";
import {
    addEditFolderId,
    addFolderAdd,
    addSetFolderAutoFocusId,
    selectFolder
} from "../redux/slice/folderSlice";
import {global} from "../assets/global";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";

const {primary, secondary, transition_speed1} = global

const Folder = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: ${p => p.folderColor};
    overflow: hidden;
    ${transition_speed1}
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
     > .container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 40px;
        ${transition_speed1}
        > input {
            height: 50%;
            width: 80%;
            background-color: transparent;
            outline: none;
            border: none;
            overflow: hidden;
            border-bottom: 2px solid ${primary};
            resize: none;
            padding-bottom: 5px;
            
        }
     }
`


const styleAddFolderIcon = `
    color: ${primary};`

const styleX = `
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: ${primary};
    transform: scale(1.5);
    margin: 0 7px;`


const MyComponent = forwardRef((p, ref) => {
    const [newFolder, setNewFolder] = useState(false)
    const {Juuten_folderLists} = useSelector(selectFolder)
    const dispatch = useDispatch()
    const {setRegTest, setSameName} = p
    const regular = /[:\\\/*?'"<>|]/

    const autoFocus = (text) => {
        if (!text) return
        dispatch(addSetFolderAutoFocusId())
        const end = text.value.length
        text.setSelectionRange(end, end)
        text.focus()
    }


    const addNewFolder = () => {
        dispatch(addSetFolderAutoFocusId('Juuten_AddFolderTextarea'))
        dispatch(addEditFolderId())
        setNewFolder(true)
    }


    const createdNewFolderOrNot = (e, type) => {
        if (type === 'stop') {
            document.getElementById('Juuten_AddFolderTextarea').value = ''
            setNewFolder(false)
            return
        }

        let value = document.getElementById('Juuten_AddFolderTextarea').value
        document.getElementById('Juuten_AddFolderTextarea').value = ''
        if (value === '') {
            setNewFolder(false)
            return
        } else if (regular.test(value)) {
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
        dispatch(addFolderAdd({
            name: value,
            folderColor: secondary
        }))
    }


    useImperativeHandle(ref, () => ({
        newFolder: newFolder,
        createNewFolder(e, type) {
            newFolder && createdNewFolderOrNot(e, type)
        }
    }))


    return (
        <Folder
            key='Juuten_addNewFolder'
            add={newFolder}
            onClick={(e) => e.stopPropagation()}
            folderColor={secondary}>

            <div
                className="container">
                <Icon.Plus
                    styled={styleAddFolderIcon}
                    onClick={() =>
                        !newFolder
                        && addNewFolder()}/>
            </div>


            {
                newFolder
                && <div
                    className="container">
                    <Icon.X
                        styled={styleX}
                        onClick={(e) => createdNewFolderOrNot(e, 'stop')}/>
                    <input
                        type='text'
                        id={'Juuten_AddFolderTextarea'}
                        ref={text =>
                            newFolder
                            && autoFocus(text)}/>
                </div>
            }

        </Folder>
    );
});

export default MyComponent;
