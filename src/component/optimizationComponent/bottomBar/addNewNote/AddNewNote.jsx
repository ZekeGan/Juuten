import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {
    addAddNewNote,
    addCleanTexting,
    selectCollection
} from "../../../../redux/slice/collectionSlice";
import {toggleProps} from "../../../../assets/global";
import {selectGlobal} from "../../../../redux/slice/globalSlice";
import BottemBarTemplate from "../BottemBarTemplate.jsx";
import DraftComponent from "../../DraftComponent.jsx";
import TextEditorIcon from "../../pureComponent/TextEditorIcon.jsx";


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
    }`

const BTN = styled.div`
    cursor: pointer;
    user-select: none;
    height: 30px;
    width: 100px;
    background-color: ${({config}) => config.WandB};
    border-radius: 15px;
    text-align: center;
    line-height: 30px;
    &:active {
        transform: scale(0.95);
    }`

const AddNewNote = React.memo((
    {
        barArea,
        open = false,
        setOpen = () => {}
    }) => {
    const {Juuten_EditingText} = useSelector(selectCollection)
    const {configuration: config} = useSelector(selectGlobal)
    const dispatch = useDispatch()
    const draftRef = useRef(null)
    const [inlineStyle, setInlineStyle] = useState([])


    function addNewNote() {
        if (!draftRef.current.hasText()) return
        dispatch(addAddNewNote({
            text: draftRef.current.getJSONData(),
            area: barArea
        }))
        console.log(draftRef.current.getJSONData())
        setOpen(false)
        dispatch(addCleanTexting())
        draftRef.current?.cleanEditorState()
    }

    console.log('addNewNote')

    function handleToggleStyle(keyword, e) {
        draftRef.current?.toggleStyle(keyword, e)
    }


    useEffect(() => {
        if (open) {
            draftRef.current?.autoFocus()
        }
    }, [open])

    return (
        <BottemBarTemplate
            open={open}
            closeCallback={() => setOpen(false)}
        >
            <Main>
                <Textarea config={config}>
                    <DraftComponent
                        ref={draftRef}
                        setInlineStyle={setInlineStyle}
                        item={Juuten_EditingText[0].msg}
                        open={open}
                        autoSave={{
                            type: 'textingBox',
                            key: 'Juuten_editingText',
                            destination: 'Juuten_EditingText'
                        }}
                    />
                </Textarea>
                <EditToolbar config={config}>
                    <div className={'toggle_box'}>
                        {toggleProps.map((item) => (
                            <TextEditorIcon
                                key={`textEditorIcon_${item.icon}`}
                                icon={item.icon}
                                style={inlineStyle.includes(item.keyword) ? item.style : ''}
                                keyword={item.keyword}
                                fn={(e) => handleToggleStyle(item.keyword, e)}
                                curr={true}
                            />
                        ))}
                    </div>
                    <BTN config={config} onClick={() => addNewNote()}>新增</BTN>
                </EditToolbar>
            </Main>
        </BottemBarTemplate>
    );
})

export default AddNewNote;