import React, {useState, forwardRef, useImperativeHandle, useRef, useEffect} from 'react';
import Icon from "../../component/pureComponent/Svg.jsx";
import {
    addEditFolderId,
    addFolderAdd,
    selectFolder
} from "../../redux/slice/folderSlice";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import FolderTemplate from "../../component/folder/FolderTemplate.jsx";
import JInput from "../../component/JInput.jsx";
import {selectGlobal} from "../../redux/slice/globalSlice";


const Container = styled.div`
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease-out;
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`



const MyComponent = (p, ref) => {
    const [newFolder, setNewFolder] = useState(false)
    const {Juuten_folderLists} = useSelector(selectFolder)
    const dispatch = useDispatch()
    const {setRegTest, setSameName} = p
    const regular = /[:\\\/*?'"<>|]/
    const inputRef = useRef(null)
    const {configuration: config} = useSelector(selectGlobal)

    const addNewFolder = () => {
        dispatch(addEditFolderId())
        setNewFolder(true)
    }


    const createdNewFolderOrNot = (e, type) => {
        if (type === 'stop' || !inputRef.current.value) {
            setNewFolder(false)
            return
        }

        const value = inputRef.current.value

        if (regular.test(value)) {
            console.log('ssss')
            setRegTest(regular.test(value))
            setTimeout(() => void setRegTest(false), 3000)
            return
        } else if (Juuten_folderLists.find(item => item.name === value)) {
            setSameName(true)
            setTimeout(() => void setSameName(false), 3000)
            return
        }
        setNewFolder(false)
        inputRef.current.value = ''
        dispatch(addFolderAdd({
            name: value,
            folderColor: config.secondary
        }))
    }


    useEffect(() => {
        if (!!inputRef && newFolder) {
            setTimeout(() => inputRef.current.focus(), 500)
        }
    }, [newFolder])


    return (

        <FolderTemplate
            style={{overflow: 'hidden'}}
            onClick={(e) => e.stopPropagation()}
        >

            <Container
                config={config}
                style={{transform: newFolder ? 'translatey(50%)' : 'translatey(-50%)'}}
                onClick={() => addNewFolder()}
            >
                <Icon.Plus
                    size={config.icon_size_xl}
                    styled={`color: ${config.main}`}
                />
            </Container>

            <Container
                config={config}
                style={{transform: newFolder ? 'translatey(-50%)' : 'translatey(50%)'}}
            >
                <div onClick={(e) => createdNewFolderOrNot(e, 'stop')}>
                    <Icon.X
                        size={config.icon_size_xl}
                        styled={`color: ${config.main}`}
                    />
                </div>

                <JInput mRef={inputRef}/>

                <div onClick={(e) => createdNewFolderOrNot(e)}>
                    <Icon.Save
                        size={config.icon_size_xl}
                        styled={`color: ${config.main}`}
                    />
                </div>

            </Container>
        </FolderTemplate>


    );
}

export default MyComponent;
