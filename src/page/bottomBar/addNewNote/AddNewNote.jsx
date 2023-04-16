import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import BottemBarTemplate from "../../../component/bar/BottemBarTemplate.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addAddNewNote, addOpenAddNewNote, selectCollection} from "../../../redux/slice/collectionSlice";
import styled from "styled-components";
import DraftComponent from "../../../component/DraftComponent.jsx";
import {selectGlobal} from "../../../redux/slice/globalSlice";
import TextEditorIcon from "../../../component/pureComponent/TextEditorIcon.jsx";
import {toggleProps} from "../../../assets/global";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 30px;
    margin: 0 3%;`


const Textarea = styled.div`
    display: block;
    height: 70%;
    background-color: ${({config}) => config.WandB};
    padding: 2%;
    overflow: hidden;
    border-radius: 10px;
    > .editor {
        color: red;
    }`

const EditToolbar = styled.div`
    display: flex;
    justify-content: right;
    height: 10%;
    margin-top: 3%;
    border-radius: 10px;
    > .toggle_box {
        width: 100%;
        display: flex;
    }
    .btn {
        cursor: pointer;
        user-select: none;
         height: 30px;
        border-radius: 15px;
        text-align: center;
        line-height: 30px;
        &:active {
            transform: scale(0.95);
        }
    }

    .addNote_btn {
        width: 100px;
        background-color: ${({config}) => config.WandB};
    }
    
`


function AddNewNote(props) {
    const {openAddNewNote, toggleCSS} = useSelector(selectCollection)
    const {configuration: config} = useSelector(selectGlobal)
    const dispatch = useDispatch()
    const draftRef = useRef(null)



    function addNewNote() {
        if (!draftRef.current.hasText()) return
        dispatch(addAddNewNote(draftRef.current.getJSONData()))
        console.log(draftRef.current.getJSONData())
        dispatch(addOpenAddNewNote())
    }

    function handleToggleStyle(keyword, e) {
        draftRef.current?.toggleStyle(keyword, e)
    }


    useEffect(() => {
        if (openAddNewNote) draftRef.current?.autoFocus()
    }, [openAddNewNote])

    return (
        <BottemBarTemplate
            // fullPage={true}
            open={openAddNewNote}
            closeCallback={() => dispatch(addOpenAddNewNote())}
        >

            <Main>
                <Textarea config={config}>
                    <DraftComponent ref={draftRef}/>
                </Textarea>
                <EditToolbar config={config}>
                    <div className={'toggle_box'}>
                        {
                            toggleProps.map((item) => (
                                <TextEditorIcon
                                    key={`textEditorIcon_${item.icon}`}
                                    icon={item.icon}
                                    style={toggleCSS.includes(item.keyword) ? item.style : ''}
                                    keyword={item.keyword}
                                    fn={(e) => handleToggleStyle(item.keyword, e)}
                                    curr={true}
                                />
                            ))
                        }
                    </div>
                    <div
                        className={'btn addNote_btn'}
                        onClick={() => addNewNote()}
                    >
                        新增
                    </div>
                </EditToolbar>
            </Main>
        </BottemBarTemplate>
    );
}

export default AddNewNote;