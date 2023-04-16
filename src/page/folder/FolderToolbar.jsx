import React, {useRef, useState} from 'react';
import styled from "styled-components";
import Icon from "../../component/pureComponent/Svg.jsx";
import {
    addFolderEdit,
    selectFolder
} from "../../redux/slice/folderSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectGlobal} from "../../redux/slice/globalSlice";


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

const Folder = styled.div`
    width: 300px;
    padding: 4px 5px;
    border-right: 1px solid ${({config}) => config.secondary};
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
            font-size: ${({config}) => config.font_size_m}px;
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
    border: 1px solid ${({config}) => config.secondary};
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


const App = ({setDelCheck, item, setSameName}) => {

    const {Juuten_folderLists, tagCurrentColor, Juuten_tagLists} = useSelector(selectFolder)
    const dispatch = useDispatch()
    const [tagOpen, setTagOpen] = useState(false)
    const [detectFolderName, setDetectFolderName] = useState('')
    const inputRef = useRef()
    const {configuration: config} = useSelector(selectGlobal)

    const deleteFolder = () => {
        setDelCheck(true)
    }

    const changeFolderColor = (e, color) => {
        dispatch(addFolderEdit({
            type: 'color',
            value: color
        }))
    }



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
            <Folder config={config}>
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

                <div className="Juuten_color">
                    {
                        config.color.map(item1 => (
                            <ColorDot
                                config={config}
                                key={`Jutten_colorDot_${item1}`}
                                exist={() => item.find(item2 => item2 === item1)}
                                color={item1}
                                onClick={(e) => changeFolderColor(e, item1)}/>
                        ))
                    }
                </div>
            </Folder>


            <IconBox>
                <div onClick={() => deleteFolder()}>
                    <Icon.Delete size={config.font_size_l}/>
                </div>
            </IconBox>

        </FolderToolbar>
    );
}

export default App;
