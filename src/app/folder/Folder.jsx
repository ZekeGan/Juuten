import React, {useState, useEffect, useMemo} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {addEditFolderAnimationId, addEditFolderId, addFolderEdit, selectFolder} from "../../redux/slice/folderSlice";
import {useNavigate} from "react-router-dom";

import {global} from "../../assets/global";
import Icon from '../../assets/svg.jsx'
import Navbar from "./FolderNavbar.jsx";
import AddNewFolder from "./AddNewFolder.jsx";

const {primary, secondary, tertiary, transition_speed1, warning} = global


const Folders = styled.div`
    position: relative;
    width: 450px;
    height: 600px;
    user-select: none;`
// Navbar
const FolderSection = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 450px;
    height: calc(600px - 48px);
    overflow: scroll;
    overflow-x: hidden;
    transform: translateY(48px);
    padding: 0;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${secondary};
        border-radius: 5px;
    }`

const DelCheck = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    position: absolute;
    top: 55px;
    left: 50%;
    transform: translateX(-50%) translateY(${({delCheck}) => delCheck ? 0 : '-150%'});
    width: 400px;
    height: 100px;  
    text-align: center; 
    background-color: ${warning};
    color: white;
    z-index: 8;
    border-radius: 10px;
    ${transition_speed1}
    font-size: 0.5rem;
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

const FoldersContainer = styled.div`
     display: flex;
     flex-wrap: wrap;
     padding: 0 40px;`

/* folders */

const FolderContainer = styled.div`
    position: relative;
`

const Folder = styled.div`
    position: relative;
    display: flex;
    flex-direction: columns;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: ${({animation}) => animation ? '0' : '100px'};
    height: 80px;
    border-radius: 5px;
    background-color: ${p => p.folderColor};
    margin: ${({animation}) => animation ? '25px 0px' : '25px 10px;'};
    overflow: hidden;
    ${transition_speed1}
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
    > .Juuten_mask {
        display: ${({open}) => open ? 'none' : 'block'};
        z-index: 3;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        transform: translateY(20px);
    }
    > .container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        ${transition_speed1}
        > textarea {
            height: 50%;
            width: 80%;
            background-color: transparent;
            outline: none;
            border: none;
            overflow: hidden;
            border-bottom: 2px solid ${primary};
            font-size: 0.4rem;
            resize: none;
            padding-bottom: 5px;
            
        }
    }
    > .iconActive {
        transform: translateY(${p => p.add ? '80px' : 0});
    }
    > .textActive {
        flex-direction: column;
        transform: translateY(${p => p.add ? '-80px' : 0});
        > .addNewIcon {
            margin-top: 5px;
            transform: translateY(-10px);
            display: flex;
        }
    }
    > div > svg {
        opacity: ${p => p.open ? 0 : 1};
        
    }`

const FolderName = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 100px;
    padding: 0 5px;
     > textarea {
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: transparent;
        margin-top: 10px;
        color: ${p => p.font ? primary : tertiary};
        outline: none;
        border: none;
        overflow: hidden;
        font-size: 9px;
        resize: none;
     }
`

const Warning = styled.div`
    position: absolute;
    top: 55px;
    left: 50%;
    transform: translateX(-50%) translateY(${({warning}) => warning ? '0' : '-200%'});
    width: 350px;
    height: 20px;  
    text-align: center; 
    background-color: ${warning};
    color: white;
    z-index: 8;
    border-radius: 10px;
    ${transition_speed1}
    font-size: 0.5rem;`

const EditFolderToolbar = styled.div`
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%) translateY(${p => p.open ? '-26px' : 0});
    border-radius: 5px 5px 0 0;
    width: ${({animation}) => animation ? '0' : '90px'};
    height: 15px;
    background-color: ${p => p.folderColor};
    ${transition_speed1}
`


/* icon style */
const styleEllipsisRotate90 = `
    color: ${primary};
    position: absolute;
    top: -50%;
    left: 0;
    top: 0;
    left: 50%;
    transform: translateX(-50%) scale(1.3);`


export default function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {Juuten_folderLists, editFolderId, addFolderAnimationId} = useSelector(selectFolder)
    const [regTest, setRegTest] = useState(false)
    const [sameName, setSameName] = useState(false)
    const [delCheck, setDelCheck] = useState(false)


    const goIntoFolder = (index) => {
        navigate('/collection/N1') // *****************************************<==== delete when build
        /* editFolderId === '' 代表沒有在編輯資料夾
         * 在編輯A資料夾 無法進入A資料夾
         * */


        // if (editFolderId || editFolderId === index) return
        // const fn = () => navigate(`/collection/${index}`)
        // dispatch(addFetchData({index, fn}))
    }

    const doubleDelCheck = () => {
        setDelCheck(false)
        dispatch(addFolderEdit({type: 'delete', value: editFolderId}))
        dispatch(addEditFolderId())
    }


    useEffect(() => {
        document.querySelectorAll('textarea').forEach(item => item.style.height = item.scrollHeight + 'px')
    }, []);

    /* 新增資料夾後的動畫
    * 概念:
    * 新增後把新增的 index值 賦予給 addFolderAnimationId
    * map 比對所有資料和紀錄的 id 值，設為 true
    * 當 useMemo 感受到變動 非同步再次設為 false
    * 狀態改變 動畫啟動
    *  */
    useMemo(() => {
        setTimeout(() => {
            dispatch(addEditFolderAnimationId())
        }, 0)
    }, [addFolderAnimationId])


    return (
        <Folders>

            <Navbar setDelCheck={setDelCheck}/>

            <Warning warning={regTest}>資料夾名稱不能含有 \ / : * ? ' " &lt; &gt; | </Warning>
            <Warning warning={sameName}>資料夾名稱重複</Warning>

            <DelCheck delCheck={delCheck}>
                <span>注意： 如果刪除資料夾，資料夾內資料會永久消失</span>
                <button className='JuutenDel-yes' onClick={() => doubleDelCheck()}>確認</button>
                <button className='JuutenDel-no' onClick={() => setDelCheck(false)}>取消</button>
            </DelCheck>


            <FolderSection>
                <FoldersContainer>
                    {/* 新增資料夾 */}
                    <AddNewFolder setRegTest={setRegTest} setSameName={setSameName}/>
                    {/*{folderAnimationShow && <AddFolderAnimation add={folderAnimation}/>}*/}


                    {/* iterate folder lists */}
                    {Juuten_folderLists.map(item => (
                        <FolderContainer key={item.index}>

                            <EditFolderToolbar open={editFolderId === item.index} folderColor={item.folderColor}
                                               animation={item === addFolderAnimationId}/>

                            <Folder onDoubleClick={() => goIntoFolder(item.index)} open={editFolderId === item.index}
                                    folderColor={item.folderColor}
                                    animation={item === addFolderAnimationId}
                            >
                                <div className="Juuten_mask"/>
                                <FolderName font={item.font}>
                                    <textarea defaultValue={item.name} id={`Juuten_${item.index}`} disabled/>
                                </FolderName>
                                {/* 三個點，設定檔案夾 */}
                                <Icon.Ellipsis_Rotate90 styled={styleEllipsisRotate90}
                                                        onClick={() => dispatch(addEditFolderId(item.index))}/>
                            </Folder>

                        </FolderContainer>
                    ))}

                </FoldersContainer>
            </FolderSection>

        </Folders>
    );
}
export {Folder}
