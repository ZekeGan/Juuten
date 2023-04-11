import React, {useRef, useState, forwardRef} from 'react';
import styled from "styled-components";
import Icon from "../../assets/svg.jsx";
import {global} from "../../assets/global";
import {
    addEditFolderId,
    addFolderEdit, addSetFolderNewName,
    addTagEdit,
    selectFolder
} from "../../redux/slice/folderSlice";
import {useDispatch, useSelector} from "react-redux";

const {color, tagColor, secondary, font_size_m, font_size_s} = global

const FolderToolbar = styled.div`
    display: flex;
    position: absolute;
    left: 50%;
    top: -100px;
    z-index: 10;
    // width: 420px;
    background-color: white;
    transform: translateX(-50%);
    border-radius: 5px;
    box-shadow: 3px 3px 10px 2px rgba(0,0,0,0.3);
`

const Tags = styled.div`
    width: 50%;
    padding: 5px 10px;
    border-right: 1px solid ${secondary};
    > .tagAdd {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 10px;
        > .dot {
            width: 20px;
            height: 20px;
            border-radius: 10px;
            background-color: ${({tagColor}) => tagColor};
            cursor: pointer;
        }
        > input {
            width: 70%;
            height: 25px;
            outline: none;
            border: none;
            font-size: ${font_size_m}px;
            margin-left: 10px;
            border-bottom: 1px solid black;
        }
        
        > .tagSelect {
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            width: 100%;
        }
    }
    > .tagShow {
        display: flex;
        flex-wrap: wrap;
    }
`
const OneTag = styled.div`
    display: flex;
    height: 20px;
    color: ${({font}) => font ? 'black' : 'white'};
    background-color: ${({color}) => color};
    border-radius: 10px;
    box-shadow: 2px 2px 3px 1px rgba(0,0,0,0.3);
    margin: 3px;
    padding: 2px 10px 2px 0;
    > span {
        font-size: ${font_size_s}px;
        line-height: 16px;
    }
`

const Folder = styled.div`
    width: 300px;
    padding: 4px 5px;
    border-right: 1px solid ${secondary};
    > .changeFolderName {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
        > input[type='text'] {
            width: 100%;
            height: 25px;
            outline: none;
            border: none;
            margin-right: 10px;
            font-size: ${font_size_m}px;
            border-bottom: 1px solid black;
        }
    }
    > .Juuten_color {
        display: flex;
        flex-wrap: wrap;
    }
`

const ColorDot = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${p => p.color};
    border-radius: 10px;
    border: 1px solid ${secondary};
    margin: 3px 5px;
    cursor: pointer;
`

const IconBox = styled.div`
    width: 42px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    padding: 5px 0;
    > div {
        transform: scale(1.2);
        padding-left: 8%;
    }
`


const App = (p) => {
    const {setDelCheck, item, setSameName} = p
    const {Juuten_folderLists, tagCurrentColor, Juuten_tagLists} = useSelector(selectFolder)
    const dispatch = useDispatch()
    const [tagOpen, setTagOpen] = useState(false)
    const [detectFolderName, setDetectFolderName] = useState('')
    const inputRef = useRef()

    const deleteFolder = () => setDelCheck(true)

    const changeFolderColor = (e, color) => {
        dispatch(addFolderEdit({
            type: 'color',
            value: color
        }))
    }

    // const changeFolderName = (type) => {
    //     let rename = document.querySelector(`#Juuten_${editFolderId}`)
    //     if (type === 'editing') {
    //         setEditName(true)
    //         rename.disabled = false
    //     } else {
    //         setEditName(false)
    //         rename.disabled = true
    //         dispatch(addFolderEdit({
    //             type: 'name',
    //             value: rename.value
    //         }))
    //         dispatch(addEditFolderId())
    //     }
    // }

    // const tagEdit = (e, item) => {
    //     setTagOpen(false)
    //     dispatch(addTagEdit({
    //         type: item.type,
    //         color: item.color,
    //         name: item.name
    //     }))
    // }

    const saveFolderNewName = () => {
        if (Juuten_folderLists.find(item => item.name === detectFolderName)) {
            /* 檢測是否有重複名稱 */
            setSameName(true)
            setTimeout(() => void setSameName(false), 3000)
            return
        }
        dispatch(addFolderEdit({
            type: 'name',
            value: detectFolderName
        }))
        inputRef.current.value = ''
    }



    return (
        <FolderToolbar
            onClick={(e) => {e.stopPropagation()}}
            onDoubleClick={(e) => {e.stopPropagation()}}
        >
            <Folder>
                <div
                    className='changeFolderName'>
                    <input
                        type="text"
                        id='Juuten_FolderName'
                        ref={inputRef}
                        onInput={(e) => setDetectFolderName(e.target.value)}
                        placeholder='更改名稱'/>
                    {
                        detectFolderName !== ''
                            && <Icon.Save onClick={() => saveFolderNewName()}/>
                    }
                </div>

                <div
                    className="Juuten_color">
                    {
                        color.map(item1 => (
                            <ColorDot
                                key={`Jutten_colorDot_${item1}`}
                                exist={() => item.find(item2 => item2 === item1)}
                                color={item1}
                                onClick={(e) => changeFolderColor(e, item1)}/>
                        ))
                    }
                </div>
            </Folder>


            <IconBox>
                <Icon.Delete
                    onClick={() => deleteFolder()}/>
            </IconBox>



            {/*<Tags*/}
            {/*    tagColor={tagCurrentColor}>*/}
            {/*    <div*/}
            {/*        className='tagAdd'*/}
            {/*    >*/}
            {/*        <div*/}
            {/*            className="dot"*/}
            {/*            onClick={() => setTagOpen(true)}*/}
            {/*        />*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            onInput={() => writeTag()}*/}
            {/*            placeholder='加入標籤' ref={tagRef}*/}
            {/*        />*/}
            {/*        {*/}
            {/*            tagAdd*/}
            {/*            && <Icon.Plus*/}
            {/*                onClick={(e) => tagEdit(e, {*/}
            {/*                    type: 'addTag',*/}
            {/*                    name: tagRef.current.value*/}
            {/*                })}/>*/}
            {/*        }*/}
            {/*        {*/}
            {/*            tagOpen*/}
            {/*            && <div*/}
            {/*                className="tagSelect"*/}
            {/*                onClick={(e) => e.stopPropagation()}>*/}
            {/*                {*/}
            {/*                    tagColor.map(item =>*/}
            {/*                        <ColorDot*/}
            {/*                            key={item}*/}
            {/*                            color={item}*/}
            {/*                            onClick={(e) => tagEdit(e, {*/}
            {/*                                type: 'changeColor',*/}
            {/*                                color: item*/}
            {/*                            })}/>*/}
            {/*                    )*/}
            {/*                }*/}
            {/*            </div>}*/}
            {/*    </div>*/}

            {/*    <div*/}
            {/*        className="tagShow">*/}
            {/*        {*/}
            {/*            Juuten_tagLists.map(tags => (*/}
            {/*                <OneTag*/}
            {/*                    key={`Jutten_tagName_${tags.name}`}*/}
            {/*                    onClick={() => tagEdit()}*/}
            {/*                    font={tags.font}*/}
            {/*                    color={tags.color}>*/}
            {/*                    <Icon.X/>*/}
            {/*                    <span>{tags.name}</span>*/}
            {/*                </OneTag>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</Tags>*/}

        </FolderToolbar>
    );
}

export default App;
