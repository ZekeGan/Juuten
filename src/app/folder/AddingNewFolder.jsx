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

const {main, primary, secondary, transition_speed1, icon_size_xl} = global

// const Folder = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     height: 40px;
//     border-radius: 5px;
//     background-color: ${p => p.folderColor};
//     overflow: hidden;
//     ${transition_speed1}
//     box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
//      > .container {
//         position: relative;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         width: 100%;
//         height: 40px;
//         ${transition_speed1}
//         > input {
//             height: 50%;
//             width: 80%;
//             background-color: transparent;
//             outline: none;
//             border: none;
//             overflow: hidden;
//             border-bottom: 2px solid ${primary};
//             resize: none;
//             padding-bottom: 5px;
//
//         }
//      }
// `

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

const NewFolderInput = styled.input`
    height: 50%;
    width: 70%;
    background-color: transparent;
    outline: none;
    border: none;
    overflow: hidden;
    border-bottom: 2px solid ${main};
    resize: none;
    padding-bottom: 5px;
    margin: 0 5%;
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
                <NewFolderInput
                    ref={inputRef}
                />
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
