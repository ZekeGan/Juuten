import React, {useState, forwardRef, useImperativeHandle, useRef, useEffect} from 'react';
import Icon from "../../assets/svg.jsx";
import {
    addEditFolderId,
    addFolderAdd,
    addSetFolderAutoFocusId,
    selectFolder
} from "../../redux/slice/folderSlice";
import {global} from "../../assets/global";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import FolderTemplate from "./FolderTemplate.jsx";
import {Draggable} from "react-beautiful-dnd";
import JInput from "../../component/JInput.jsx";

const {main, primary, secondary, transition_speed1, icon_size_xl} = global


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
    ${transition_speed1}
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
            folderColor: secondary
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
                style={{transform: newFolder ? 'translatey(50%)' : 'translatey(-50%)'}}
                onClick={() => addNewFolder()}
            >
                <Icon.Plus
                    size={icon_size_xl}
                    styled={`color: ${main}`}
                />
            </Container>

            <Container
                style={{transform: newFolder ? 'translatey(-50%)' : 'translatey(50%)'}}
            >
                <Icon.X
                    size={icon_size_xl}
                    styled={`color: ${main}`}
                    onClick={(e) => createdNewFolderOrNot(e, 'stop')}
                />
                <JInput mRef={inputRef}/>
                <Icon.Save
                    size={icon_size_xl}
                    styled={`color: ${main}`}
                    onClick={(e) => createdNewFolderOrNot(e)}
                />
            </Container>
        </FolderTemplate>


    );
}

export default MyComponent;
