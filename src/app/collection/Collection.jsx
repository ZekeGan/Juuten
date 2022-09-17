import React, {useState} from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addOpenBar, addOpenStorage, selectCollection} from "../../redux/slice/collectionSlice";

import Storage from "./Storage.jsx";
import Bar from "./Bar.jsx";
import NoteArea from "./NoteArea.jsx";
import Icon from '../../assets/svg.jsx'
import {global} from "../../assets/global";
const {main, primary, secondary, warning} = global


const Collection = styled.div`
    width: 450px;
    height: 600px;
    position: relative;
    overflow: hidden;
    background-color: ${primary};`
const Navbar = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    width: 450px;
    height: 48px;
    background-color: rgba(255,255,255,0.9);
    display: flex;
    align-items: center;
    justify-content: space-around;
    > input {
        width: 300px;
        height: 25px;
        border-radius: 12.5px;
        border: none;
        background-color: ${primary};
        outline: none;
        padding-left: 15px;
        font-size: 12px;
    }`
const StorageCount = styled.div`
    position: relative;
    > i {
        position: absolute;
        bottom: 5%;
        right: -30%;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: ${warning};
        color: white;
        font-style: normal;   
        font-size: 0.5rem;
        line-height: 15px;
        text-align: center;
    }`

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


export default function App(props) {
    /*獲取資料的方式 :
    * 1. 根據字串'Juuten_Folder'get 到資料夾的名稱，並map()資料夾列表
    * 2. 點選進資料夾，利用動態路由生成頁面
    * 3. 根據useParams獲取資料夾數據，get到資料夾數據的資料
    * 4. 生成頁面資料
    * */


    /* Hooks */
    const [saveWarning, setSaveWarning] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const obj = useSelector(selectCollection)
    const storage = obj['storage']


    /* function */
    const back = () => {
        if (obj.openEditId) {
            setSaveWarning(true)
            setTimeout(()=>{
                setSaveWarning(false)
            }, 3000)
        }
        else navigate('/home')
    }
    const openStorage = (payload) => dispatch(addOpenStorage(payload))
    const openBar = (payload) => dispatch(addOpenBar(payload))


    return (
        <Collection openStorage={obj.openStorage}>


            <Navbar>
                <Icon.Left styled={navbarIcon} onClick={() => back()}/>
                <input type="text"/>
                <Icon.Plus styled={navbarIcon}/>
                <StorageCount>
                    <Icon.Box styled={navbarIcon} onClick={() => openStorage('open')}/>
                    {storage.length === 0 ? '' : <i>{storage.length}</i>}
                </StorageCount>
                <Icon.Bar styled={navbarIcon} onClick={() => openBar('open')}/>
            </Navbar>


            <NoteArea isSave={saveWarning}/>


            <Storage ellipsis={ellipsisIcon} navbar={navbarIcon}/>


            <Bar ellipsis={ellipsisIcon} navbar={navbarIcon}/>

        </Collection>
    );
}

