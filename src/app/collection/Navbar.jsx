import React from 'react';
import styled from "styled-components";
import {addOpenBar, addOpenStorage, addAddNewNote} from "../../redux/slice/collectionSlice";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {global} from "../../assets/global";

import Icon from "../../assets/svg.jsx";

const {primary, warning} = global

/* style */
const Navbar = styled.div`
    position: absolute;
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


const App = (p) => {
    const {storage, navbarIcon, setSaveWarning, openEditId} = p
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()


    /* fn */
    const back = () => {
        if (openEditId) {
            setSaveWarning(true)
            setTimeout(() => setSaveWarning(false), 3000)
        } else {
            navigate('/home')
        }
    }
    const openStorage = (payload) => dispatch(addOpenStorage(payload))
    const openBar = (payload) => dispatch(addOpenBar(payload))

    const addNewNote = () => {
        dispatch(addAddNewNote(id))
    }

    return (
        <Navbar>

            {/* 上一頁 */}
            <Icon.Left styled={navbarIcon} onClick={() => back()}/>


            {/* 搜尋區 */}
            <input type="text"/>


            {/* 加入新筆記 */}
            <Icon.Plus styled={navbarIcon} onClick={() => addNewNote()}/>


            {/* 顯示暫存區數量 */}
            <StorageCount>
                <Icon.Box styled={navbarIcon} onClick={() => openStorage('open')}/>
                {storage.length === 0 ? '' : <i>{storage.length}</i>}
            </StorageCount>


            {/* 更多工具 Icon */}
            <Icon.Bar styled={navbarIcon} onClick={() => openBar('open')}/>

        </Navbar>
    );
};

export default App;
