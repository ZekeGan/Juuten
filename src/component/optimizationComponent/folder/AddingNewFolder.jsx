import React, {useState, useRef, useEffect} from 'react';
import Icon from "../Svg.jsx";
import {
    addEditFolderId,
    addFolderAdd,
} from "../../../redux/slice/folderSlice";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {selectGlobal} from "../../../redux/slice/globalSlice";
import AddNewInput from "../AddNewInput.jsx";


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
    transform: ${({newFolder}) => newFolder}
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .inputBox {
        width: 70%;
    }`
const Main = styled.div`
    position: relative;
    width: ${({config}) => config.max_width * 0.9}px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0 10px 0;
    border-radius: 10px;   
    background-color: ${({config}) => config.WandB};
    transition: 0.2s ease-out;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
    overflow: hidden;`


export default React.memo(({setRegTest}) => {
    const {configuration: config} = useSelector(selectGlobal)
    const dispatch = useDispatch()

    const inputRef = useRef(null)
    const [newFolder, setNewFolder] = useState(false)
    const regular = /[:\\\/*?'"<>|]/

    const addNewFolder = () => {
        dispatch(addEditFolderId())
        setNewFolder(true)
    }

    console.log('addnewfolder')

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

    function onClick(e) {
        e.stopPropagation()
    }

    console.log('newFolder')

    return (
        <Main config={config} onClick={(e) => onClick(e)}>
            <Container
                config={config}
                newFolder={newFolder ? 'translateY(50%);' : 'translateY(-50%);'}
                onClick={addNewFolder}
            >
                <Icon.Plus
                    size={config.icon_size_xl}
                    styled={`color: ${config.main}`}
                />
            </Container>

            <Container
                config={config}
                newFolder={newFolder ? 'translateY(-50%);' : 'translateY(50%);'}
            >
                <div onClick={(e) => createdNewFolderOrNot(e, 'stop')}>
                    <Icon.X
                        size={config.icon_size_xl}
                        styled={`color: ${config.main}`}
                    />
                </div>

                <div className={'inputBox'}>
                    <AddNewInput mRef={inputRef}/>
                </div>

                <div onClick={(e) => createdNewFolderOrNot(e)}>
                    <Icon.Save
                        size={config.icon_size_xl}
                        styled={`color: ${config.main}`}
                    />
                </div>

            </Container>

        </Main>
    );
})