import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {global} from "../assets/global";
import {addEditFolderId, addFolderEdit, selectFolder} from "../redux/slice/folderSlice";
import {useDispatch, useSelector} from "react-redux";
import DraftComponent from "./DraftComponent.jsx";

const {warning, transition_speed1, primary, font_size_m} = global
const Page = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(${({delCheck}) => delCheck ? '20px' : '-150%'});
    width: 400px;
    height: 100px;  
    text-align: center; 
    background-color: ${warning};
    color: white;
    z-index: 8;
    border-radius: 10px;
    ${transition_speed1}
    font-size: ${font_size_m};
    > span {
        display: block;
        width: 100%;
        height: 20px;
        margin-top: 10px;
    }
    > button {
        width: 30%;
        height: 40%;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }
    > .JuutenDel-yes {
        background-color: black;
        color: white;
    }
    > .JuutenDel-no {
        background-color: ${primary};
    }
`
function DeletingCheck(props) {
    const {delCheck, setDelCheck} = props
    const {editFolderId} = useSelector(selectFolder)
    const dispatch = useDispatch()
    const draftRef = useRef(null)

    useEffect(() => {
        console.log(draftRef)
    }, [])
    const doubleDelCheck = () => {
        setDelCheck(false)
        dispatch(addFolderEdit({type: 'delete', value: editFolderId}))
        dispatch(addEditFolderId())
    }
    return (
        <Page delCheck={delCheck}>
            <DraftComponent ref={draftRef}/>
            <span>請注意： 如果刪除資料夾，資料夾內資料將會永久消失</span>
            <button className='JuutenDel-yes'
                    onClick={() => doubleDelCheck()}>
                確認
            </button>
            <button
                className='JuutenDel-no'
                onClick={() => setDelCheck(false)}>
                取消
            </button>
        </Page>
    );
}

export default DeletingCheck;