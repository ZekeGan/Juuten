import React, { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {addFolderAdd,} from "slice/folderSlice.js";
import { selectGlobal } from "slice/globalSlice.js";
import Icon from "com/Svg.jsx";
import AddNewInput from "com/pure/AddNewInput.jsx";


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
    transform: translateY(${({ newFolder }) => newFolder ? '50%' : '-50%'});
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
    width: ${({ config }) => config.max_width * 0.9}px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0 10px 0;
    border-radius: 10px;   
    background-color: ${({ config }) => config.WandB};
    transition: 0.2s ease-out;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
    overflow: hidden;`




export default React.memo((
    {
        newFolder,
        setNewFolder = () => { },
        checkName = () => { },
    }) => {
    const { configuration: config } = useSelector(selectGlobal)
    const dispatch = useDispatch()
    const inputRef = useRef(null)



    function addNewFolder(bool) {
        setNewFolder(bool)
        if (bool) {
            inputRef.current.focus({ preventScroll: true })
        }
        inputRef.current.value = ''
    }

    function createdNewFolderOrNot() {
        if (checkName(inputRef.current.value)) return

        setNewFolder(false)
        dispatch(addFolderAdd({
            name: inputRef.current.value,
            folderColor: config.secondary
        }))
        inputRef.current.value = ''
    }

    return (
        <Main
            config={config}
            onClick={(e) => e.stopPropagation()}
        >
            <Container
                config={config}
                newFolder={newFolder}
                onClick={() => addNewFolder(true)}
            >
                <Icon.Plus
                    size={config.icon_size_xl}
                    styled={`color: ${config.main}`}
                />
            </Container>

            <Container
                config={config}
                newFolder={!newFolder}
            >
                <div onClick={() => addNewFolder(false)}>
                    <Icon.X
                        size={config.icon_size_xl}
                        styled={`color: ${config.main}`}
                    />
                </div>

                <div className={'inputBox'}>
                    <AddNewInput mRef={inputRef} />
                </div>

                <div onClick={createdNewFolderOrNot}>
                    <Icon.Save
                        size={config.icon_size_xl}
                        styled={`color: ${config.main}`}
                    />
                </div>

            </Container>

        </Main>
    );
},
    (p, n) => p.newFolder === n.newFolder
)