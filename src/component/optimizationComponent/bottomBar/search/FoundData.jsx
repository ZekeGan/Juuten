import React, {useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {convertFromRaw, convertToRaw, EditorState, RichUtils} from "draft-js";
import {selectGlobal} from "../../../../redux/slice/globalSlice";
import styled from "styled-components";
import DraftComponent from "../../DraftComponent.jsx";
import Url from "../../Url.jsx";
import Comment from "../../collection/Comment.jsx";
import JInput from "../../pureComponent/JInput.jsx";

const TextContainer = styled.div`
    width: 90%;
    margin: 2% 0;
    .folder-name {
        margin-bottom: 2%;
    }
    .search-note-folder-container {
        background-color: white;
        border-radius: 10px;
    }`

const NoteContainer = styled.div`
    padding: 2%;
    ${({isBottom, config}) => isBottom ? '' : `border-bottom: 3px solid ${config.primary}`}`


const MyComponent = ({data}) => {
    const {configuration: config} = useSelector(selectGlobal)
    const inputRef = useRef(null)
    const [foundData, setFoundData] = useState([])
    console.log('foundData')


    function findData() {
        const target = inputRef.current?.value
        const newData = data
            .map(item => {
                const comment = item.comment
                    .filter(item2 => isMsgHas(item2.msg, target))
                    .map(item => {
                        return {
                            ...item,
                            msg: highlightMsg(item.msg, target)
                        }
                    })
                const _data = {
                    ...item,
                    msg: isMsgHas(item.msg, target)
                        ? highlightMsg(item.msg, target)
                        : (comment.length
                            ? highlightMsg(item.msg, target)
                            : ''),
                    comment: comment
                }
                return (!!_data.msg || !!_data.comment.length) ? _data : null
            })
            .filter(item => item !== null)
            .reduce((outputObject, {folderName, ...rest}) => {
                if (!outputObject[folderName]) outputObject[folderName] = []
                outputObject[folderName].push({...rest})
                return outputObject
            }, {})
        if (!target) setFoundData([])
        else setFoundData(newData)
    }

    function isMsgHas(msg, target) {
        return EditorState
            .createWithContent(convertFromRaw(JSON.parse(msg)))
            .getCurrentContent()
            .getPlainText()
            .toUpperCase()
            .includes(target.toUpperCase())
    }

    function highlightMsg(msg, target) {

        target = target.toUpperCase()
        if (target === '') return msg
        let editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(msg)))
        const plainText = editorState.getCurrentContent().getPlainText().toUpperCase()
        // const regex = new RegExp(target, 'gi')
        const positions = []
        let detect = 0
        let index = plainText.indexOf(target)
        while (index !== -1) {
            if (index - detect !== 1) positions.push(index)
            index = plainText.indexOf(target, index + 1)
            detect = index
        }
        if (positions.length <= 0) return msg

        positions.forEach((i, idx) => {
            let start = {
                value: positions[idx],
                flag: true
            }
            let end = {
                value: positions[idx] + target.length,
                flag: true
            }

            const blocks = editorState.getCurrentContent().getBlockMap()
            let anchorKey, focusKey, anchorOffset, focusOffset
            if (blocks.count() > 1) {
                blocks.forEach(block => {
                    const len = block.getLength()
                    if (!anchorKey && (!start.flag || start.value <= len)) {
                        anchorKey = block.getKey()
                        anchorOffset = start.value
                    }
                    if (start.value >= len && start.flag) {
                        start.value -= len
                    } else {
                        start.flag = false
                    }
                    if (!focusKey && (!end.flag || end.value <= len)) {
                        focusKey = block.getKey()
                        focusOffset = end.value
                    }
                    if (end.value >= len && end.flag) {
                        end.value -= len
                    } else {
                        end.flag = false
                    }
                })
            } else {
                blocks.forEach(block => {
                    anchorOffset = start.value
                    focusOffset = end.value
                    anchorKey = block.getKey()
                    focusKey = block.getKey()
                })
            }
            const selection = editorState.getSelection().merge({
                anchorKey,
                focusKey,
                anchorOffset,
                focusOffset,
            })
            const selectedState = EditorState.forceSelection(editorState, selection)
            editorState = RichUtils.toggleInlineStyle(selectedState, 'HIGHLIGHT')
        })


        return JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        // return msg
    }

    return (
        <>
            <JInput mRef={inputRef} callback={findData}/>
            {Object.keys(foundData).map(item => (
                <TextContainer key={item}>
                    <div className={'folder-name'}>{item}</div>
                    <div className='search-note-folder-container'>
                        {foundData[item].map((item2, idx2) => (
                            <NoteContainer
                                config={config}
                                key={item2.key}
                                isBottom={!foundData[item][idx2 + 1]}
                            >
                                <DraftComponent
                                    item={item2.msg}
                                />
                                <Url item={item2}/>
                                {item2.comment.length > 0
                                && item2.comment.map(item3 => (
                                    <Comment key={item3.key} item={item3} showToolbar={false}/>
                                ))}
                            </NoteContainer>
                        ))}
                    </div>
                </TextContainer>
            ))}
        </>

    );
};

export default MyComponent;
