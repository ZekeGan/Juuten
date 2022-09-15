import React from 'react';
import styled from "styled-components";
import {global} from "./global/global";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addOpenStorage, selectCollection} from "./redux/slice/collectionSlice";
import Storage from "./Storage.jsx";
import Icon from '../../public/svg.js'
import chrome from './redux/chromeFunction.js'

const {transition_speed1, main, primary, secondary, tertiary} = global

const Collection = styled.div`
    width: 450px;
    height: 600px;
    position: relative;
    overflow: hidden;
    background-color: ${primary};
`
const Navbar = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 450px;
    height: 48px;
    background-color: white;
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
    }
`
const NoteArea = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 58px;
    padding: 0 10px;
    > .note {
        position: relative;
        width: 100%;
        background-color: white;
        border-radius: 10px;
        margin: 5px 0;
        padding: 10px 20px;
        box-shadow: 2px 2px 0.5px rgba(0,0,0,0.2);
        ${transition_speed1}
        &:hover {
            box-shadow: 4px 4px 3px  rgba(0,0,0,0.2);
        }
    }
`
const UrlBox = styled.div`
    display: flex;
    align-items: center;
    > img {
        height: 15px;
    }
    > .url {
        font-size: 10px;
        color: ${tertiary};
        margin-left: 7px;
    }
`
const Msg = styled.div`
    margin-top: 8px;    
`
const StorageCount = styled.div`
    position: relative;
    > i {
        position: absolute;
        bottom: 5%;
        right: -30%;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: red;
        color: white;   
        font-size: 12px;
        line-height: 12px;
        text-align: center;
    }
`

const ellipsisIcon = `
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%) scale(1.1);
    color: ${main};
    cursor: pointer;
`
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


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const obj = useSelector(selectCollection)
    const storage = obj['storage']
    const {id} = useParams()
    const data = obj[id]
    const back = () => navigate('/home')
    const openStorage = (payload) => dispatch(addOpenStorage(payload))


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
                <Icon.Bar styled={navbarIcon}/>
            </Navbar>
            <NoteArea>
                {
                    data.map(item => (
                        <div key={item.url + item.msg} className='note'>
                            <UrlBox>
                                <img src={item.favIconUrl} alt=""/>
                                <div className="url">{item.url}</div>
                            </UrlBox>
                            <Msg>{item.msg}</Msg>
                            <Icon.Ellipsis styled={ellipsisIcon}/>
                        </div>
                    ))
                }
            </NoteArea>
            <Storage ellipsis={ellipsisIcon} navbar={navbarIcon}/>

        </Collection>
    );
}

export {NoteArea, UrlBox, Msg}
