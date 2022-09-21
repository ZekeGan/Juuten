import React, {useState} from 'react';
import Icon from "../../assets/svg.jsx";
import {addEditFolderId, addFolderEdit, selectFolder} from "../../redux/slice/folderSlice";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {global} from "../../assets/global";

const {transition_speed1, color} = global


const Navbar = styled.div`
    position: absolute;
    top: 48px;
    left: 0;
    z-index: 9;
    width: 450px;
    height: 48px;
    margin-bottom: 10px;
    background-color: white;
    transform: translateY(-48px);`
const Toolbar = styled.div`
    width: 100%;
    height: 100%; 
    display: flex;
    justify-content: space-around;
    align-items: center;
    transform: translateY(${p => p.open ? 0 : '-48px'});
    ${transition_speed1}`
const ColorDot = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${p => p.color};
    border-radius: 10px;
`
const styleToolX = `
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: black;
    transform: scale(1.5);`


const App = (p) => {
    const {setDelCheck} = p
    const dispatch = useDispatch()
    const [editName, setEditName] = useState(false)
    const {editFolderId, Juuten_folderLists} = useSelector(selectFolder)


    const changeFolderColor = (color) => dispatch(addFolderEdit({
        type: 'color',
        value: color
    }))


    const changeFolderName = (type) => {
        let rename = document.querySelector(`#Juuten_${editFolderId}`)
        if (type === 'editing') {
            setEditName(true)
            rename.disabled = false
        } else {
            setEditName(false)
            rename.disabled = true
            dispatch(addFolderEdit({
                type: 'name',
                value: rename.value
            }))
            dispatch(addEditFolderId())
        }
    }

    const deleteFolder = () => setDelCheck(true)

    return (
        <Navbar>
            <Toolbar open={editFolderId}>

                {/* 關閉 Icon */}
                <Icon.X styled={styleToolX} onClick={() => dispatch(addEditFolderId())}/>


                {/* 顏色選擇條 */}
                {color.map(item => (
                    <ColorDot key={item} color={item[0] === 't' ? item.slice(1) : item}
                              onClick={() => changeFolderColor(item)}/>
                ))}


                {/* 編輯資料夾名稱 */}
                {!editName &&
                <Icon.Pen styled={styleToolX.replace('1.5', '1.2')}
                          onClick={() => changeFolderName('editing')}/>
                }
                {editName &&
                <Icon.Check styled={styleToolX} onClick={() => changeFolderName('done')}
                />}


                {/* 刪除 Icon */}
                <Icon.Delete styled={styleToolX} onClick={() => deleteFolder()}/>

            </Toolbar>
        </Navbar>
    );
};

export default App;
