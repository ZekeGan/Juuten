import React, {useRef, useState} from 'react';
import styled from "styled-components";
import Icon from "../Svg.jsx";
import {
    addFolderEdit,
    selectFolder
} from "../../../redux/slice/folderSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectGlobal} from "../../../redux/slice/globalSlice";
import AddNewInput from "../AddNewInput.jsx";


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
        .icon {
            display: flex;
            align-items: center;
        }
    }
    > .Juuten_color {
        display: flex;
        flex-wrap: wrap;
    }`

const ColorDot = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${p => p.color};
    border-radius: 10px;
    border: 1px solid ${({config}) => config.secondary};
    margin: 3px 5px;
    cursor: pointer;`

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
    }`

const isEqual = (prevProps, nextProps) => {
    return prevProps === nextProps
}
const App = React.memo((
    {
        setDelCheck = () => {
        },
        item = {},
    }) => {
    const {configuration: config} = useSelector(selectGlobal)
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const [detectFolderName, setDetectFolderName] = useState('')

    const deleteFolder = () => {
        setDelCheck(true)
    }

    const changeFolderColor = (e, color) => {
        console.log('pass')
        dispatch(addFolderEdit({
            type: 'color',
            value: color
        }))
    }

    console.log('folderToolbar')

    const saveFolderNewName = () => {
        dispatch(addFolderEdit({
            type: 'name',
            value: detectFolderName
        }))
        inputRef.current.value = ''
    }

    function stopPropagation(e) {
        e.stopPropagation()
    }


    return (
        <FolderToolbar
            onClick={(e) => stopPropagation(e)}
            onDoubleClick={(e) => stopPropagation(e)}
        >
            <Folder config={config}>
                <div className='changeFolderName'>
                    <AddNewInput
                        mRef={inputRef}
                        onInput={() => setDetectFolderName(inputRef.current?.value)}
                    />

                    {detectFolderName !== ''
                    && <div onClick={saveFolderNewName} className={'icon'}>
                        <Icon.Save
                            size={config.font_size_l}
                            styled={`color: ${config.main}`}
                        />
                    </div>}
                </div>

                <div className="Juuten_color">
                    {config.color.map(item1 => (
                        <ColorDot
                            config={config}
                            key={`Jutten_colorDot_${item1}`}
                            exist={() => item.find(item2 => item2 === item1)}
                            color={item1}
                            onClick={(e) => changeFolderColor(e, item1)}
                        />
                    ))}
                </div>
            </Folder>


            <IconBox>
                <div onClick={deleteFolder}>
                    <Icon.Delete
                        size={config.font_size_l}
                        styled={`color: ${config.main}`}
                    />
                </div>
            </IconBox>

        </FolderToolbar>
    );
}, isEqual)

export default App;
