import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { addAddNewNote, addCleanTexting, selectCollection } from "slice/collectionSlice";
import { selectGlobal } from "slice/globalSlice";

import { toggleProps } from "assets/global";
import BottemBarTemplate from "../BottemBarTemplate.jsx";
import DraftComponent from "com/DraftComponent.jsx";
import TextEditorIcon from "com/pure/TextEditorIcon.jsx";
import { setDataToLocal } from 'src/utils';


const Main = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 30px;
    margin: 0 3%;`

const Textarea = styled.div`
    display: block;
    height: 70%;
    background-color: ${({ config }) => config.WandB};
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
    background-color: ${({ config }) => config.WandB};
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
        setOpen = () => { }
    }) => {
    const { Juuten_EditingText } = useSelector(selectCollection)
    const { configuration: config } = useSelector(selectGlobal)
    const dispatch = useDispatch()
    const draftRef = useRef(null)
    const [inlineStyle, setInlineStyle] = useState([])


    function addNewNote() {
        if (!draftRef.current.hasText()) return
        dispatch(addAddNewNote({
            text: draftRef.current.getJSONData(),
            area: barArea
        }))
        setOpen(false)
        dispatch(addCleanTexting())
        draftRef.current?.cleanEditorState()
        setDataToLocal('Juuten_EditingText', [{ msg: '', key: 'Juuten_EditingText' }])
    }

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
                            key: 'Juuten_EditingText',
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
                                curr
                            />
                        ))}
                    </div>
                    <BTN
                        config={config}
                        onClick={() => addNewNote()}>
                        新增
                    </BTN>

                </EditToolbar>
            </Main>
        </BottemBarTemplate>
    );
},
    (p, n) => p.open === n.open
)

export default AddNewNote;