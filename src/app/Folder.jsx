import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {global} from "../assets/global";
import {useDispatch, useSelector} from "react-redux";
import {addAddNewFolder, addEditFolder, addFolderAddOrEdit, selectFolder} from "../redux/slice/folderSlice";
import {useNavigate} from "react-router-dom";
import Icon from '../assets/svg.jsx'

const {primary, secondary, tertiary, transition_speed1, color, warning} = global

/* top */
const Folders = styled.div`
    width: 450px;
    height: 600px;
    overflow: hidden;    
    background-color: ${primary};
    user-select: none;`
const Navbar = styled.div`
    position: fixed;
    z-index: 9;
    width: 450px;
    height: 48px;
    margin-bottom: 10px;
    background-color: white;`
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
const Warning = styled.div`
    position: fixed;
    width: 350px;
    height: 20px;
    z-index: 9;
    background-color: ${warning};
    color: white;
    border-radius: 10px;
    ${transition_speed1}
    transform: translateX(50px) translateY(${p => p.warning ? '60px' : '0'});
    text-align: center;
    font-size: 0.5rem;
`


/* folders */
const FoldersContainer = styled.div`
     display: flex;
     flex-wrap: wrap;
     margin-top: 48px;
     padding: 0 38px;`
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
    width: 100px;
    height: 80px;
    border-radius: 5px;
    background-color: ${p => p.folderColor};
    margin: 25px 12px;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
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
const EditFolderToolbar = styled.div`
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%) translateY(${p => p.open ? '-26px' : 0});
    border-radius: 5px 5px 0 0;
    width: 90px;
    height: 15px;
    background-color: ${p => p.folderColor};
    ${transition_speed1}
`

/* icon style */
const styleAddFolderIcon = `
    width: 40%;
    color: ${primary};`
const styleEllipsisRotate90 = `
    color: ${primary};
    position: absolute;
    top: -50%;
    left: 0;
    top: 0;
    left: 50%;
    transform: translateX(-50%) scale(1.3);`
const styleX = `
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: ${primary};
    transform: scale(1.5);
    margin: 0 7px;
`
const styleToolX = `
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: black;
    transform: scale(1.5);`


export default function App(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {folderLists, editFolderId} = useSelector(selectFolder)
    const [newFolder, setNewFolder] = useState(false)
    const [regTest, setRegTest] = useState(false)
    const [sameName, setSameName] = useState(false)
    const [editName, setEditName] = useState(false)


    const textareaAutoResize = (ta) => {
        // ta.style.height = `${ta.scrollHeight}px`
    }
    const folderSubmit = (data) => {
        let value = document.querySelector('.newFolder').value
        const regular = /[:\\\/*?'"<>|]/
        if (data === 'X') {
            document.querySelector('.newFolder').value = ''
            setNewFolder(false)
        } else {
            if (value === '') {
                setNewFolder(false)
                return
            }
            else if (regular.test(value)) {
                console.log(regular.test(value))
                setRegTest(regular.test(value))
                setTimeout(()=>{
                    setRegTest(false)
                },2000)
                return
            }
            else if (folderLists.find(item => item.name === value)) {
                setSameName(true)
                setTimeout(()=>{
                    setSameName(false)
                },2000)
                return
            }
            dispatch(addFolderAddOrEdit({
                type: 'add',
                name: value,
                folderColor: secondary
            }))
            document.querySelector('.newFolder').value = ''
            setNewFolder(false)
        }
    }
    const goTo = (item) => {
        if (editFolderId === '') {
            navigate(`/collection/${item}`)
        } else if (!(editFolderId === item)) {
            navigate(`/collection/${item}`)
        }
    }
    const changeFolderColor = (color) => dispatch(addFolderAddOrEdit({type: 'change', folderColor: color}))
    const changeFolderName = (type) => {
        let rename = document.querySelector(`#Jutten_${editFolderId.replaceAll(' ', '_')}`)
        if (type === 'editing') {
            setEditName(true)
            console.log(rename)
            rename.disabled = false
            dispatch(addFolderAddOrEdit({type: ''}))
        }else {
            setEditName(false)
            rename.disabled = true
        }

    }

    useEffect(() => {
        document.querySelectorAll('textarea').forEach(item => item.style.height = item.scrollHeight + 'px')
    }, []);



    return (
        <Folders>
            <Warning warning={regTest}>資料夾名稱不能有 \ / : * ? ' " &lt; &gt; | </Warning>
            <Warning warning={sameName}>資料夾名稱重複</Warning>

            {/* navbar */}
            <Navbar>
                <Toolbar open={editFolderId}>
                    <Icon.X styled={styleToolX} onClick={() => dispatch(addEditFolder())}/>
                    {color.map(item => (
                        <ColorDot key={item} color={item[0] === 't' ? item.slice(1) : item} onClick={() => changeFolderColor(item)}/>
                    ))}
                    {!editName && <Icon.Pen styled={styleToolX.replace('1.5', '1.2')}
                               onClick={() => changeFolderName('editing')}/>}
                    {editName && <Icon.Check styled={styleToolX} onClick={() => changeFolderName()}/>}
                </Toolbar>
            </Navbar>



            <FoldersContainer>

            {/* iterate folder lists */}
                {folderLists.map(item => (
                    <FolderContainer key={item.name}>
                        <EditFolderToolbar open={editFolderId === item.name} folderColor={item.folderColor}/>
                        <Folder onDoubleClick={() => goTo(item.name)}
                                open={editFolderId === item.name}
                                folderColor={item.folderColor}
                        >
                            <FolderName font={item.font}>
                                <textarea defaultValue={item.name}
                                          id={`Jutten_${item.name.replaceAll(' ', '_')}`}
                                          onInput={(e) => textareaAutoResize(e.target)}
                                          disabled
                                />
                            </FolderName>
                            <Icon.Ellipsis_Rotate90 styled={styleEllipsisRotate90}
                                                    onClick={() => dispatch(addEditFolder(item.name))}/>
                        </Folder>
                    </FolderContainer>
                ))}

                {/* 新增資料夾 */}
                <Folder key='Juuten_addNewFolder' add={newFolder} folderColor={secondary}>
                    <div className="container iconActive" onClick={() => setNewFolder(true)}>
                        <Icon.Plus styled={styleAddFolderIcon}/>
                    </div>
                    <div className="container textActive">
                        <div className="addNewIcon">
                            <Icon.X styled={styleX} onClick={() => folderSubmit('X')}/>
                            <Icon.Check styled={styleX} onClick={() => folderSubmit()}/>
                        </div>
                        <textarea rows='1' className='newFolder' onInput={(e) => textareaAutoResize(e.target)}/>

                    </div>
                </Folder>
            </FoldersContainer>


        </Folders>
    );
}
